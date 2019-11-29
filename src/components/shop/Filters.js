import React, { useEffect, useContext, useState } from 'react';
import styled from 'styled-components';
import { up } from 'styled-breakpoints';
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
    opacity: 1,
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

const Wrapper = styled.div`
  margin-bottom: 25px;
  position: relative;
  max-height: ${props => (props.isOpen ? '800px' : '80px')};
`;
const Inner = styled.div`
  padding: 0 1rem;
  position: relative;
  z-index: 2;
  background-image: linear-gradient(
    to bottom,
    rgba(256, 256, 256, 1) 0%,
    rgba(256, 256, 256, 1) 70%,
    rgba(256, 256, 256, 0) 100%
  );
`;

const Header = styled(Flex)`
  ${container};
  padding: 1rem 0;
  height: 80px;
  align-items: center;
  position: relative;
  z-index: 8;
`;

const List = styled.ul`
  columns: 2;
  ${up('tablet')} {
    columns: ${props => props.columns};
  }
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
  padding: 0 1rem;
`;

const ColumnsInner = styled(Flex)`
  ${container};
  flex-wrap: wrap;
  padding: 1rem 0;

  ul {
    padding: 0.5rem 0;
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

const Columns = ({ ids = { models: [], collections: [], colors: [] } }) => {
  const { state, dispatch } = useContext(GlobalContext);
  const isFilterActive = (key, value) =>
    state.filters.has(key) && state.filters.get(key).has(value);

  const toggleFilter = (key, value) => {
    dispatch({ type: 'update_filters', payload: { key, value } });
  };

  const filterEmptyItems = (array, key) =>
    array.filter(item => ids[key].includes(item._id));

  return (
    <StaticQuery
      query={graphql`
        query {
          models: allSanityModel(sort: { fields: title, order: ASC }) {
            nodes {
              _id
              id
              title
            }
          }
          collections: allSanityCollection(
            sort: { fields: title, order: ASC }
          ) {
            nodes {
              _id
              id
              title
            }
          }
          colors: allSanityProductColor(sort: { fields: title, order: ASC }) {
            nodes {
              _id
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
        const models = filterEmptyItems(data.models.nodes, 'models');
        const collections = filterEmptyItems(
          data.collections.nodes,
          'collections'
        );
        const colors = filterEmptyItems(data.colors.nodes, 'colors');
        return (
          <ColumnsWrapper>
            <ColumnsInner>
              {models && models.length > 0 && (
                <Box width={[1, 1 / 2]} mb={[20, 0]}>
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
                <Box width={[1, 1 / 3]} mb={[20, 0]}>
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
                <Box width={[1, 1 / 6]}>
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

const Filters = ({ location, ids }) => {
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
        <Inner>
          <Header>
            <Box mr="auto">
              <ToggleButton onClick={() => setIsOpen(!isOpen)}>
                <Heading fontSize="1rem">Filtres</Heading>
                <Text
                  mx="0.5rem"
                  fontSize={14}
                  color={
                    flatFiltersSize > 0 ? colors.lipstick : colors.warmGrey
                  }
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
        </Inner>
        <motion.nav style={{ zIndex: 1 }} variants={wrapper}>
          <Columns ids={ids} />
        </motion.nav>
      </motion.div>
    </Wrapper>
  );
};

export default withLocation(Filters);
