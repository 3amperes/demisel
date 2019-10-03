import React from 'react';
import styled from 'styled-components';
import { StaticQuery, Link, graphql } from 'gatsby';
import { Text } from 'rebass/styled-components';
import { container } from '@utils/mixins';
import { colors } from '@theme';

const Wrapper = styled.footer`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-column-gap: 46px;
  grid-row-gap: 100px;
  padding: 150px 0;
  ${container}

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
      <Title>Collections</Title>
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
            <Title>Entreprise</Title>
            <ul>
              <li>
                <Link to="/brand">La marque</Link>
              </li>
              <li>
                <Link to="/contact">Contactez-nous</Link>
              </li>
              <li>
                <Link to="/rgpd">Politique de confidentialité</Link>
              </li>
              <li>
                <Link to="/cgu">CGV - CGU</Link>
              </li>
              <li>
                <Link to="/shipping">Livraison et retour</Link>
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
                <Link to="/selling-points">Nos points de vente</Link>
              </li>
              <li>
                <Link to="/dealer-acces">Accès revendeur</Link>
              </li>
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
