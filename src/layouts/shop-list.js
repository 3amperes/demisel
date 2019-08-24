import React, { useRef, useEffect } from 'react';
import { graphql } from 'gatsby';

import MainLayout from './main';
import { ShopList, Filters } from '@components/shop';
import withLocation from '@utils/withLocation';

import SEO from '@components/seo';

const Shop = ({ data, search }) => {
  const initialSearch = useRef(search);
  const products = data.allSanityProduct.edges;

  useEffect(() => {
    console.log(search, initialSearch);
    // Object.values(initialSearch).map(value => {

    //   dispatch({ type: 'update_filters', payload: { key, value } });
    // })
  }, [initialSearch]);

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
