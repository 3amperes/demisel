import React, { useEffect, useContext } from 'react';
import styled from 'styled-components';
import { StaticQuery, graphql, navigate } from 'gatsby';
import queryString from 'query-string';
import { container } from '@utils/mixins';
import withLocation from '@utils/withLocation';
import { GlobalContext } from '@components/globalStore';
import { colors } from '@theme';

const Wrapper = styled.nav`
  padding: 50px 0;
  margin-bottom: 25px;
  border: solid 1px ${colors.whiteTwo};
`;
const Inner = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-column-gap: 46px;
  ${container}
`;

const FilterItem = styled.div`
  padding: 0.5rem 0;
  cursor: pointer;
  color: ${props => (props.isActive ? colors.lipstick : colors.black)};
`;

const Filters = ({ location }) => {
  const { state, dispatch } = useContext(GlobalContext);

  const isFilterActive = (key, value) =>
    state.filters.has(key) && state.filters.get(key).has(value);

  const toggleFilter = (key, value) => {
    dispatch({ type: 'update_filters', payload: { key, value } });
  };

  const clearFilters = () => {
    dispatch({ type: 'init_filters', payload: null });
  };

  useEffect(() => {
    let url = location.pathname;
    if (state.filters && state.filters.size > 0) {
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
  }, [state.filters]);

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
        }
      `}
      render={data => {
        const models = data.models.nodes;
        const collections = data.collections.nodes;
        return (
          <Wrapper>
            <Inner>
              {models && models.length > 0 && (
                <div>
                  <strong>Modèles</strong>
                  <ul>
                    {models.map(model => (
                      <li key={model.id}>
                        <FilterItem
                          onClick={() => toggleFilter('model', model.id)}
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
                  <strong>Colections</strong>
                  <ul>
                    {collections.map(collection => (
                      <li key={collection.id}>
                        <FilterItem
                          onClick={() =>
                            toggleFilter('collection', collection.id)
                          }
                          isActive={isFilterActive('collection', collection.id)}
                        >
                          {collection.title}
                        </FilterItem>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <div>
                <button type="button" onClick={clearFilters}>
                  clear filters
                </button>
              </div>
            </Inner>
          </Wrapper>
        );
      }}
    />
  );
};

export default withLocation(Filters);
