import React from 'react';
import { graphql } from 'gatsby';

import MainLayout from './main';
import { ShopList, Filters } from '@components/shop';

import SEO from '@components/seo';

const Shop = ({ data }) => {
  const products = data.allSanityProduct.edges;

  return (
    <MainLayout>
      <SEO title="Shop" />
      <Filters />
      <ShopList items={products}></ShopList>
    </MainLayout>
  );
};

export default Shop;

export const query = graphql`
  query {
    allSanityProduct {
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
            discountPrice
            weight
          }
          model {
            id
            title
            price {
              salePrice
              dealerPrice
              discountPrice
              weight
            }
          }
          collections {
            id
          }
          colors {
            id
          }
        }
      }
    }
  }
`;
