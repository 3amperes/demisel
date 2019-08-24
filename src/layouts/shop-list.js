import React from 'react';
import { graphql } from 'gatsby';

import MainLayout from './main';
import { ShopList, Filters } from '@components/shop';
import withLocation from '@utils/withLocation';

import SEO from '@components/seo';

const Shop = ({ data, search }) => {
  const params = Object.values(search).map(value => {
    return typeof value === 'string' ? [value] : value;
  });
  console.log({ params });
  const products = data.allSanityProduct.edges;
  console.log(products, search);
  return (
    <MainLayout>
      <SEO title="Shop" />
      <Filters />
      <ShopList items={products}></ShopList>
    </MainLayout>
  );
};

export default withLocation(Shop);

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
