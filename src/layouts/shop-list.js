import React, { useContext } from 'react';
import { graphql } from 'gatsby';
import { GlobalContext } from '@components/globalStore';
import { ShopList, Filters } from '@components/shop';
import MainLayout from './main';
import SEO from '@components/seo';

const Shop = ({ data }) => {
  const {
    state: { currentCategory },
    dispatch,
  } = useContext(GlobalContext);
  const products = data.products.edges;
  const models = data.groupByModels.group.map(model => model.fieldValue);
  const collections = data.groupByCollections.group.map(
    model => model.fieldValue
  );
  const colors = data.groupByColors.group.map(model => model.fieldValue);

  if (currentCategory) {
    dispatch({ type: 'update_current_category', payload: null });
    dispatch({ type: 'init_items', payload: products });
  }

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
      <ShopList />
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
