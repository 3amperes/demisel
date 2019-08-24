import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { StaticQuery, graphql, navigate } from 'gatsby';
import queryString from 'query-string';
import { container } from '@utils/mixins';
import withLocation from '@utils/withLocation';
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

const Filters = ({ location, search }) => {
  const [filters, setFilters] = useState({
    model: [],
  });
  const toggleFilter = (key, value) => {
    const newFilters = { ...filters };
    if (filters[key].includes(value)) {
      // remove
      newFilters[key] = filters[key].filter(f => f !== value);
    } else {
      // add
      newFilters[key] = [...filters[key], value];
    }
    setFilters(newFilters);
  };
  const isFilterActive = (key, value) => filters[key].includes(value);

  useEffect(() => {
    const queryParams = queryString.stringify(filters, {
      arrayFormat: 'comma',
    });
    const url = queryParams
      ? `${location.pathname}?${queryParams}`
      : location.pathname;
    navigate(url);
  }, [filters]);

  return (
    <StaticQuery
      query={graphql`
        query {
          allSanityModel {
            nodes {
              id
              title
            }
          }
        }
      `}
      render={data => {
        const models = data.allSanityModel.nodes;
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
            </Inner>
          </Wrapper>
        );
      }}
    />
  );
};

export default withLocation(Filters);
