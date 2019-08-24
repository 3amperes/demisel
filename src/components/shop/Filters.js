import React, { useState } from 'react';
import styled from 'styled-components';
import { StaticQuery, graphql } from 'gatsby';
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

const Filters = ({ location, search }) => {
  console.log(search);
  const [filters, setFilters] = useState({
    model: [],
  });
  // to={`${location.pathname}?model=${model.id}&test`}
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

  console.log(filters);

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
                        <div onClick={() => toggleFilter('model', model.id)}>
                          {model.title}
                        </div>
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
