import React, { useEffect } from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import SEO from "../components/seo";
import { ProductList } from "../components/product";

const IndexPage = ({ data }) => {
  const products = data.allSanityProduct.edges;

  return (
    <Layout>
      <SEO title="Shop" />
      <ProductList items={products} />
    </Layout>
  );
};

export default IndexPage;

export const query = graphql`
  query ProductQuery {
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
