import React, { useEffect, useContext, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { StaticQuery, graphql, navigate } from 'gatsby';
import queryString from 'query-string';
import { Box, Flex, Heading, Text } from 'rebass/styled-components';
import { container } from '@utils/mixins';
import withLocation from '@utils/withLocation';
import { GlobalContext } from '@components/globalStore';
import { colors } from '@theme';
import { areEmptyFilters } from '@utils/helpers';

const wrapper = {
  open: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.08,
    },
  },
  closed: {
    opacity: 0,
    y: '-100%',
  },
};

const items = {
  open: { opacity: 1, x: 0 },
  closed: { opacity: 0, x: 16 },
};

const toggle = {
  open: { rotate: 180 },
  closed: { rotate: 0 },
};

const Wrapper = styled.nav`
  margin-bottom: 25px;
  border-top: solid 1px ${colors.whiteTwo};
  border-bottom: solid 1px
    ${props => (!props.isOpen ? colors.whiteTwo : colors.white)};
  position: relative;
`;

const Header = styled(Flex)`
  ${container};
  padding: 1rem 0;
  height: 80px;
  align-items: center;
  position: relative;
  background-color: ${colors.white};
  z-index: 8;
`;

const List = styled.ul`
  columns: ${props => props.columns};
`;

const Dot = ({ isActive, bg }) => (
  <svg width={16} height={16}>
    {isActive && (
      <circle
        fill={colors.white}
        stroke={colors.lipstick}
        cx={8}
        cy={8}
        r={7.5}
      />
    )}
    <circle fill={bg} cx={8} cy={8} r={5} />
  </svg>
);

const Chevron = props => (
  <svg
    aria-hidden="true"
    data-icon="chevron-down"
    viewBox="0 0 448 512"
    {...props}
  >
    <path
      fill="currentColor"
      d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z"
    />
  </svg>
);

const Color = ({ title, hex, isActive }) => {
  return (
    <Flex alignItems="center">
      <Dot bg={hex} isActive={isActive} />
      <Text ml=".5rem">{title}</Text>
    </Flex>
  );
};

const ColumnsWrapper = styled.div`
  background-color: ${colors.white};
  border-bottom: solid 1px ${colors.whiteTwo};
`;

const ColumnsInner = styled(Flex)`
  ${container}
  padding: 1rem 0;

  ul {
    padding: 0.5rem 0;
  }

  .column {
    &-2 {
      columns: 2;
    }
    &-3 {
      columns: 3;
    }
  }
  .separator {
    width: 24px;
    height: 1px;
    margin: 1rem 0;
    background-color: ${colors.whiteTwo};
  }
`;

const FilterItem = styled(Text)`
  padding: 0.5rem 0;
  font-size: 14px;
  line-height: 24px;
  cursor: pointer;
  color: ${props => (props.isActive ? colors.lipstick : colors.black)};
  transition: color 250ms ease;
`;

const ColumnTitle = ({ title }) => (
  <Text fontSize={12} fontWeight="600" color="warmGrey">
    {title}
  </Text>
);

const ToggleButton = styled.button`
  outline: none;
  border: none;
  background: none;
  font-size: 16px;
  color: ${colors.warmGrey};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  cursor: pointer;
  display: flex;
`;

const ClearButton = styled.button`
  outline: none;
  border: none;
  background: none;
  font-size: 14px;
  color: ${colors.lipstick};
  cursor: pointer;
  padding: 0;
  transition: all 250ms ease;

  &:disabled {
    color: ${colors.warmGrey};
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

const Columns = () => {
  const { state, dispatch } = useContext(GlobalContext);
  const isFilterActive = (key, value) =>
    state.filters.has(key) && state.filters.get(key).has(value);

  const toggleFilter = (key, value) => {
    dispatch({ type: 'update_filters', payload: { key, value } });
  };

  return (
    <StaticQuery
      query={graphql`
        query {
          models: allSanityModel {
            nodes {
              id
              title
            }
          }
          collections: allSanityCollection {
            nodes {
              id
              title
            }
          }
          colors: allSanityProductColor {
            nodes {
              id
              title
              ref {
                hex
              }
            }
          }
        }
      `}
      render={data => {
        const models = data.models.nodes;
        const collections = data.collections.nodes;
        const colors = data.colors.nodes;
        return (
          <ColumnsWrapper>
            <ColumnsInner>
              {models && models.length > 0 && (
                <Box width={1 / 2}>
                  <ColumnTitle title="Modèles" />
                  <List
                    columns={models.length > 6 ? 3 : models.length > 3 ? 2 : 1}
                  >
                    {models.map(model => (
                      <motion.li key={model.id} variants={items}>
                        <FilterItem
                          onClick={e => toggleFilter('model', model.id, e)}
                          isActive={isFilterActive('model', model.id)}
                        >
                          {model.title}
                        </FilterItem>
                      </motion.li>
                    ))}
                  </List>
                </Box>
              )}

              {colors && colors.length > 0 && (
                <Box width={[1 / 3]}>
                  <ColumnTitle title="Couleurs" />
                  <List columns={colors.length > 3 ? 2 : 1}>
                    {colors.map(color => {
                      return (
                        <motion.li key={color.id} variants={items}>
                          <FilterItem
                            onClick={() => toggleFilter('colors', color.id)}
                            isActive={isFilterActive('colors', color.id)}
                          >
                            <Color
                              title={color.title}
                              hex={color.ref.hex}
                              isActive={isFilterActive('colors', color.id)}
                            />
                          </FilterItem>
                        </motion.li>
                      );
                    })}
                  </List>
                </Box>
              )}

              {collections && collections.length > 0 && (
                <Box width={[1 / 6]}>
                  <ColumnTitle title="Collections" />
                  <ul>
                    {collections.map(collection => (
                      <motion.li key={collection.id} variants={items}>
                        <FilterItem
                          onClick={() =>
                            toggleFilter('collections', collection.id)
                          }
                          isActive={isFilterActive(
                            'collections',
                            collection.id
                          )}
                        >
                          {collection.title}
                        </FilterItem>
                      </motion.li>
                    ))}
                    <motion.li
                      className="separator"
                      variants={items}
                    ></motion.li>
                    <motion.li variants={items}>
                      <FilterItem
                        onClick={() => toggleFilter('discount', true)}
                        isActive={isFilterActive('discount', true)}
                      >
                        Soldes
                      </FilterItem>
                    </motion.li>
                  </ul>
                </Box>
              )}
            </ColumnsInner>
          </ColumnsWrapper>
        );
      }}
    />
  );
};

const Filters = ({ location }) => {
  const { state, dispatch } = useContext(GlobalContext);
  const [isOpen, setIsOpen] = useState(false);

  const clearFilters = () => {
    dispatch({ type: 'clear_filters' });
  };

  // write query params in url with filters
  useEffect(() => {
    let url = location.pathname;
    if (state.filters && !areEmptyFilters(state.filters)) {
      const params = {};
      state.filters.forEach((value, key) => {
        params[key] = Array.from(value);
      });

      url =
        url +
        '?' +
        queryString.stringify(params, {
          arrayFormat: 'comma',
        });
    }
    navigate(url);
  }, [state.filters, location.pathname]);

  const flatFiltersSize = Array.from(state.filters.values())
    .map(collection => [...collection])
    .flat().length;

  return (
    <Wrapper isOpen={isOpen}>
      <motion.div animate={isOpen ? 'open' : 'closed'} initial="closed">
        <Header>
          <Box mr="auto">
            <ToggleButton onClick={() => setIsOpen(!isOpen)}>
              <Heading fontSize="1rem">Filtres</Heading>
              <Text
                mx="0.5rem"
                fontSize={14}
                color={flatFiltersSize > 0 ? colors.lipstick : colors.warmGrey}
              >
                ({flatFiltersSize || 'aucun'})
              </Text>
              <motion.div
                variants={toggle}
                style={{ lineHeight: 1, height: '14px' }}
              >
                <Chevron width="12px" mx="0.5rem" />
              </motion.div>
            </ToggleButton>
          </Box>
          <motion.div whileHover={{ y: -1 }} whileTap={{ y: 1 }}>
            <ClearButton
              disabled={flatFiltersSize === 0}
              onClick={clearFilters}
            >
              Réinitialiser
            </ClearButton>
          </motion.div>
        </Header>
        <motion.nav
          variants={wrapper}
          style={{
            position: 'absolute',
            top: '80px',
            width: '100%',
            zIndex: 7,
          }}
        >
          <Columns />
        </motion.nav>
      </motion.div>
    </Wrapper>
  );
};

export default withLocation(Filters);
