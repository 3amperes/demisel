import React from 'react';
import styled from 'styled-components';
import { up } from 'styled-breakpoints';
import { StaticQuery, Link, graphql } from 'gatsby';
import { Text, Flex } from 'rebass/styled-components';
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
  li {
    margin-bottom: 0.25rem;
  }
  a {
    color: ${colors.warmGrey};
    text-decoration: none;
    font-size: 14px;
    display: inline-block;
    padding: 0.25rem 0;
  }
`;

const Ours = styled(Flex)`
  justify-content: center;
  align-items: center;
  height: 144px;
  box-shadow: 0 -1px 0 0 rgba(0, 0, 0, 0.05);
`;

const Title = ({ children }) => (
  <Text fontFamily="orpheuspro" fontWeight="400" mb="1.5rem">
    {children}
  </Text>
);

const Collections = ({ items }) =>
  items.length > 0 ? (
    <div>
      <Title>Collections</Title>
      <ul>
        {items.map(node => {
          return (
            <li key={node.id}>
              <Link to={`/shop/?=${node.id}`}>{node.title}</Link>
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
        productsGroupByCollection: allSanityProduct(limit: 2000) {
          group(field: collections____id) {
            fieldValue
            totalCount
          }
        }
        collections: allSanityCollection(sort: { fields: title, order: ASC }) {
          nodes {
            _id
            id
            title
            thumbnail {
              asset {
                fixed(width: 320) {
                  ...GatsbySanityImageFixed
                }
              }
              alt
            }
          }
        }
      }
    `}
    render={data => {
      return (
        <>
          <Wrapper>
            <Collections
              items={data.collections.nodes.filter(collection =>
                data.productsGroupByCollection.group
                  .map(item => item.fieldValue)
                  .includes(collection._id)
              )}
            ></Collections>
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
                  <a href="https://www.instagram.com/demiselbijoux">
                    Instagram
                  </a>
                </li>
                <li>
                  <a href="https://www.facebook.com/demiselbijoux/">Facebook</a>
                </li>
              </ul>
            </div>
          </Wrapper>
          <Ours>
            <div>fabrication française</div>
          </Ours>
        </>
      );
    }}
  />
);

export default Footer;
