import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import SEO from '../components/seo';
import { ProductList, Filters } from '../components/product';
import { withLocation } from '../utils';

const Shop = ({ data, search }) => {
  const keys = Object.keys(search);
  const allProducts = data.allSanityProduct.edges;
  const products =
    keys.length > 0
      ? allProducts.filter(({ node: product }) => {
          const key = keys[0];
          return product[key] && product[key].id === search[key];
        })
      : allProducts;

  const filters = {
    model: data.allSanityModel.edges,
    category: data.allSanityCategory.edges,
  };

  console.info('shop props:', { data }, { search });
  return (
    <Layout>
      <SEO title="Shop" />
      <Filters filters={filters} />
      <hr />
      <ProductList items={products} />
    </Layout>
  );
};

export default withLocation(Shop);

export const query = graphql`
  query ShopQuery {
    allSanityProduct {
      edges {
        node {
          id
          slug {
            current
          }
          title
          thumbnail {
            alt
            image {
              asset {
                fluid(maxWidth: 700) {
                  ...GatsbySanityImageFluid
                }
              }
            }
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
    allSanityModel {
      edges {
        node {
          id
          title
        }
      }
    }
    allSanityCategory {
      edges {
        node {
          id
          title
        }
      }
    }
  }
`;
