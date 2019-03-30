import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
// import Image from "../components/image";

const IndexPage = ({ data }) => {
  const products = data.allProductsJson.edges;
  return (
    <Layout>
      <h1>Products</h1>
      <p>il y a {products.length} produits dans le store !</p>
      <p>les voici :</p>
      <ul>
        {products.map(({ node: product }, index) => {
          return <li key={index}>{product.name}</li>;
        })}
      </ul>
    </Layout>
  );
};

export default IndexPage;

export const query = graphql`
  query ProductQuery {
    allProductsJson {
      edges {
        node {
          id
          name
        }
      }
    }
  }
`;
