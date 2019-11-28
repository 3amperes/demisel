import React from 'react';
import { graphql } from 'gatsby';

import MainLayout from './main';
import { ShopList, Filters } from '@components/shop';

import SEO from '@components/seo';

const Shop = ({ data }) => {
  const products = data.products.edges;
  const models = data.groupByModels.group.map(model => model.fieldValue);
  const collections = data.groupByCollections.group.map(
    model => model.fieldValue
  );
  const colors = data.groupByColors.group.map(model => model.fieldValue);

  return (
    <MainLayout>
      <SEO title="Shop" />
      <Filters
        ids={{
          models,
          collections,
          colors,
        }}
      />
      <ShopList items={products}></ShopList>
    </MainLayout>
  );
};

export default Shop;

export const query = graphql`
  query {
    products: allSanityProduct {
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
    groupByModels: allSanityProduct {
      group(field: model____id) {
        fieldValue
        totalCount
      }
    }
    groupByCollections: allSanityProduct {
      group(field: collections____id) {
        fieldValue
        totalCount
      }
    }
    groupByColors: allSanityProduct {
      group(field: colors____id) {
        fieldValue
        totalCount
      }
    }
  }
`;
