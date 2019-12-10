import React, { useContext, useState } from 'react';
import { graphql } from 'gatsby';
// import { useMixpanel } from 'gatsby-plugin-mixpanel';
import { GlobalContext } from '@components/globalStore';
import { ShopList, Filters } from '@components/shop';
import MainLayout from './main';
import SEO from '@components/seo';

const Shop = ({ data }) => {
  const {
    state: { currentCategory },
    dispatch,
  } = useContext(GlobalContext);
  const [areFiltersOpen, setAreFiltersOpen] = useState(false);
  const { id, title } = data.category;
  const products = data.products.edges;
  // const mixpanel = useMixpanel();
  // mixpanel.track(`Page eShop | Catégorie ${title}`);

  const models = data.groupByModels.group.map(model => model.fieldValue);
  const collections = data.groupByCollections.group.map(
    model => model.fieldValue
  );
  const colors = data.groupByColors.group.map(model => model.fieldValue);

  if (id !== currentCategory) {
    dispatch({ type: 'update_current_category', payload: id });
    dispatch({ type: 'init_items', payload: products });
    dispatch({ type: 'init_filters', payload: [] });
  }

  return (
    <MainLayout>
      <SEO title={`Shop | ${title}`} />
      <Filters
        ids={{ models, collections, colors }}
        isOpen={areFiltersOpen}
        toggle={setAreFiltersOpen}
      />
      <ShopList
        areFiltersOpen={areFiltersOpen}
        onOpenFilters={() => setAreFiltersOpen(true)}
      />
    </MainLayout>
  );
};

export default Shop;

export const query = graphql`
  query($slug: String) {
    category: sanityCategory(slug: { current: { eq: $slug } }) {
      id
      title
    }
    products: allSanityProduct(
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
              fluid(maxWidth: 500, maxHeight: 500) {
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
            images {
              asset {
                fluid(maxWidth: 500, maxHeight: 500) {
                  ...GatsbySanityImageFluid
                }
              }
            }
          }
          collections {
            id
          }
          colors {
            id
          }
          category {
            shortName
            title
          }
        }
      }
    }
    groupByModels: allSanityProduct(
      limit: 2000
      filter: { category: { slug: { current: { eq: $slug } } } }
    ) {
      group(field: model____id) {
        fieldValue
        totalCount
      }
    }
    groupByCollections: allSanityProduct(
      limit: 2000
      filter: { category: { slug: { current: { eq: $slug } } } }
    ) {
      group(field: collections____id) {
        fieldValue
        totalCount
      }
    }
    groupByColors: allSanityProduct(
      limit: 2000
      filter: { category: { slug: { current: { eq: $slug } } } }
    ) {
      group(field: colors____id) {
        fieldValue
        totalCount
      }
    }
  }
`;
