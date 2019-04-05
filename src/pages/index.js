import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
// import Image from "../components/image";

const AddBtn = ({ product }) => (
  <button
    class="snipcart-add-item"
    data-item-id={product.id}
    data-item-name={product.name}
    data-item-price={product.price}
    data-item-url="https://demiselbijoux.netlify.com"
    data-item-description={product.name}
  >
    Ajouter au panier
  </button>
);

const IndexPage = ({ data }) => {
  const products = data.allMarkdownRemark.edges;

  return (
    <Layout>
      <h1>Products</h1>
      <p>
        il y a <strong>{products.length} produits</strong> dans le store !
      </p>
      <p>les voici :</p>
      <ul>
        {products.map(({ node: { frontmatter } }, index) => {
          return (
            <li key={index}>
              <p>{frontmatter.name}</p>
              <AddBtn product={frontmatter} />
            </li>
          );
        })}
      </ul>
    </Layout>
  );
};

export default IndexPage;

export const query = graphql`
  query ProductQuery {
    allMarkdownRemark {
      edges {
        node {
          frontmatter {
            id
            name
            price
          }
        }
      }
    }
  }
`;
