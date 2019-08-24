import React from 'react';
import styled from 'styled-components';
import { StaticQuery, Link, graphql } from 'gatsby';
import { container } from '@utils/mixins';

const Wrapper = styled.footer`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-column-gap: 46px;
  grid-row-gap: 100px;
  padding: 150px 0;
  ${container}
`;

const Categories = ({ items }) =>
  items.length > 0 ? (
    <div>
      <strong>Les catégories:</strong>
      <ul>
        {items.map(node => {
          return (
            <li key={node.id}>
              <Link to={`/shop/category/${node.slug.current}`}>
                {node.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  ) : null;

const Footer = () => (
  <StaticQuery
    query={graphql`
      query {
        allSanityCategory {
          nodes {
            id
            slug {
              current
            }
            title
          }
        }
      }
    `}
    render={data => {
      return (
        <Wrapper>
          <Categories items={data.allSanityCategory.nodes}></Categories>
          <div>
            <strong>Entreprise</strong>
          </div>
          <div>
            <strong>Partenaires</strong>
          </div>
          <div>
            <strong>Suivez-nous</strong>
          </div>
          <div>fabrication française</div>
        </Wrapper>
      );
    }}
  />
);

export default Footer;
