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
    opacity: 0.8,
    y: '-100%',
  },
};

const items = {
  open: { opacity: 1, x: 0 },
  closed: { opacity: 0, x: 16 },
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
  z-index: 20;
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
                  <ul
                    className={
                      models.length > 6
                        ? 'column-3'
                        : models.length > 3 && 'column-2'
                    }
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
                  </ul>
                </Box>
              )}

              {colors && colors.length > 0 && (
                <Box width={[1 / 3]}>
                  <ColumnTitle title="Couleurs" />
                  <ul className={models.length > 3 && 'column-2'}>
                    {colors.map(color => {
                      return (
                        <motion.li key={color.id} variants={items}>
                          <FilterItem
                            onClick={() =>
                              toggleFilter('collections', color.id)
                            }
                            isActive={isFilterActive('collections', color.id)}
                          >
                            <Color
                              title={color.title}
                              hex={color.ref.hex}
                              isActive={isFilterActive('collections', color.id)}
                            />
                          </FilterItem>
                        </motion.li>
                      );
                    })}
                  </ul>
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

  return (
    <Wrapper isOpen={isOpen}>
      <Header>
        <Heading fontSize="1em">Filtres ({state.filters.size})</Heading>
        <button onClick={() => setIsOpen(!isOpen)}>here</button>
        <button
          type="button"
          onClick={clearFilters}
          style={{ marginLeft: 'auto' }}
        >
          Réinitialiser
        </button>
      </Header>
      <motion.nav
        animate={isOpen ? 'open' : 'closed'}
        initial="closed"
        variants={wrapper}
        style={{
          position: 'absolute',
          top: '80px',
          width: '100%',
          zIndex: 10,
        }}
      >
        <Columns />
      </motion.nav>
    </Wrapper>
  );
};

export default withLocation(Filters);
