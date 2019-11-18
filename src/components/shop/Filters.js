import React, { useEffect, useContext, useState } from 'react';
import styled from 'styled-components';
import { StaticQuery, graphql, navigate } from 'gatsby';
import queryString from 'query-string';
import { Box, Flex, Heading, Text } from 'rebass/styled-components';
import { container } from '@utils/mixins';
import withLocation from '@utils/withLocation';
import { GlobalContext } from '@components/globalStore';
import { colors } from '@theme';
import { areEmptyFilters } from '@utils/helpers';

const Wrapper = styled.nav`
  margin-bottom: 25px;
  border: solid 1px ${colors.whiteTwo};
  overflow: hidden;
`;

const Header = styled(Flex)`
  ${container};
  padding: 1rem 0;
  height: 80px;
  align-items: center;
`;

const Dot = styled(Box)`
  width: 10px;
  height: 10px;
  border-radius: 50%;
`;

const Color = ({ title, hex }) => {
  return (
    <Flex alignItems="center">
      <Dot bg={hex} mr=".5rem" />
      <Text>{title}</Text>
    </Flex>
  );
};

const ColumnsWrapper = styled.div`
  ${container}
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-column-gap: 46px;
  max-height: ${props => (props.isOpen ? 'auto' : 0)};
  transition: max-height 250ms ease-out;
  > div {
    padding: 1rem 0;
  }
`;

const FilterItem = styled.div`
  padding: 0.5rem 0;
  cursor: pointer;
  color: ${props => (props.isActive ? colors.lipstick : colors.black)};
`;

const Columns = ({ isOpen }) => {
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
          <ColumnsWrapper isOpen={isOpen}>
            {models && models.length > 0 && (
              <div>
                <strong>Modèles</strong>
                <ul>
                  {models.map(model => (
                    <li key={model.id}>
                      <FilterItem
                        onClick={e => toggleFilter('model', model.id, e)}
                        isActive={isFilterActive('model', model.id)}
                      >
                        {model.title}
                      </FilterItem>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {collections && collections.length > 0 && (
              <div>
                <strong>Collections</strong>
                <ul>
                  {collections.map(collection => (
                    <li key={collection.id}>
                      <FilterItem
                        onClick={() =>
                          toggleFilter('collections', collection.id)
                        }
                        isActive={isFilterActive('collections', collection.id)}
                      >
                        {collection.title}
                      </FilterItem>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {colors && colors.length > 0 && (
              <div>
                <strong>Couleurs</strong>
                <ul>
                  {colors.map(color => {
                    return (
                      <li key={color.id}>
                        <FilterItem
                          onClick={() => toggleFilter('collections', color.id)}
                          isActive={isFilterActive('collections', color.id)}
                        >
                          <Color title={color.title} hex={color.ref.hex} />
                        </FilterItem>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
            <div>
              <FilterItem
                onClick={() => toggleFilter('discount', true)}
                isActive={isFilterActive('discount', true)}
              >
                solde
              </FilterItem>
            </div>
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

  console.log(state.filters);

  return (
    <Wrapper>
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
      <Columns isOpen={isOpen} />
    </Wrapper>
  );
};

export default withLocation(Filters);
