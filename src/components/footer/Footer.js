import React from 'react';
import styled from 'styled-components';
import { up } from 'styled-breakpoints';
import { StaticQuery, Link, graphql } from 'gatsby';
import { Text } from 'rebass/styled-components';
import { container } from '@utils/mixins';
import { colors } from '@theme';

const Wrapper = styled.footer`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-column-gap: 46px;
  grid-row-gap: 100px;
  ${container({ py: '150px' })};
  ${up('tablet')} {
    grid-template-columns: repeat(4, 1fr);
  }

  a {
    color: ${colors.warmGrey};
    text-decoration: none;
    font-size: 14px;
  }
`;

const Title = ({ children }) => (
  <Text fontFamily="orpheuspro" fontWeight="400" mb="1.5rem">
    {children}
  </Text>
);

const Categories = ({ items }) =>
  items.length > 0 ? (
    <div>
      <Title>Catégories</Title>
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
        categories: allSanityCategory {
          nodes {
            _id
            id
            slug {
              current
            }
            title
          }
        }
        productsGroupByCategories: allSanityProduct(limit: 2000) {
          group(field: category____id) {
            fieldValue
            totalCount
          }
        }
      }
    `}
    render={data => {
      return (
        <Wrapper>
          <Categories
            items={data.categories.nodes.filter(category =>
              data.productsGroupByCategories.group
                .map(item => item.fieldValue)
                .includes(category._id)
            )}
          ></Categories>
          <div>
            <Title>Entreprise</Title>
            <ul>
              <li>
                <Link to="/brand">La marque</Link>
              </li>
              <li>
                <Link to="/contact">Contactez-nous</Link>
              </li>
              <li>
                <Link to="/cgu">CGV</Link>
              </li>
              <li>
                <Link to="/legal">Mentions légales</Link>
              </li>
            </ul>
          </div>
          <div>
            <Title>Partenaires</Title>
            <ul>
              <li>
                <Link to="/outlets">Nos points de vente</Link>
              </li>
              {/* <li>
                <Link to="/dealer-acces">Accès revendeur</Link>
              </li> */}
              <li>
                <Link to="/press">Presse</Link>
              </li>
              <li>
                <Link to="/lookbook">Lookbook 19/20</Link>
              </li>
            </ul>
          </div>
          <div>
            <Title>Suivez-nous</Title>
            <ul>
              <li>
                <a href="https://www.instagram.com/demiselbijoux">Instagram</a>
              </li>
              <li>
                <a href="https://www.facebook.com/demiselbijoux/">Facebook</a>
              </li>
            </ul>
          </div>
          <div>fabrication française</div>
          <div>
            <Link to="/shop?collections=03fd8d98-c9f5-5804-8a5a-b9162d271b88&model=5a89efd0-9732-5add-934e-0cf59363d7bd">
              test filtres
            </Link>
          </div>
        </Wrapper>
      );
    }}
  />
);

export default Footer;
