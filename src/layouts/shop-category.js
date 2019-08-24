import React from 'react';
import { graphql } from 'gatsby';
import MainLayout from './main';
import SEO from '@components/seo';
import { ShopList } from '@components/shop';

const Shop = ({ data }) => {
  const products = data.allSanityProduct.edges;
  return (
    <MainLayout>
      <SEO title="Shop" />
      <ShopList items={products}></ShopList>
    </MainLayout>
  );
};

export default Shop;

export const query = graphql`
  query($slug: String) {
    allSanityProduct(
      sort: { order: DESC, fields: _updatedAt }
      limit: 2000
      filter: { category: { slug: { current: { eq: $slug } } } }
    ) {
      edges {
        node {
          id
          title
          thumbnail {
            asset {
              fluid(maxWidth: 700) {
                ...GatsbySanityImageFluid
              }
            }
            alt
          }
          price {
            salePrice
            dealerPrice
            promoPrice
            weight
          }
          model {
            id
            title
            price {
              salePrice
              dealerPrice
              promoPrice
              weight
            }
          }
        }
      }
    }
  }
`;
