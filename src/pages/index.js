import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import SEO from "../components/seo";
import Image from "gatsby-image";

const AddBtn = ({ product }) => (
  <button
    className="snipcart-add-item"
    data-item-id={product._id}
    data-item-name={product.defaultProductVariant.title}
    data-item-price={product.defaultProductVariant.price}
    data-item-url="https://demiselbijoux.netlify.com"
    data-item-description={product.name}
  >
    Ajouter au panier
  </button>
);

const IndexPage = ({ data }) => {
  console.log(data);
  const products = data.allSanityProduct.edges;
  return (
    <Layout>
      <SEO title="Accueil" />
      <h1>Quelques produits</h1>
      <ul
        style={{
          listStyle: "none",
          padding: 0,
          margin: "5rem 0",
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        {products.map(({ node: product }, index) => {
          return (
            <li
              key={product.slug.current}
              style={{
                maxWidth: 200,
                marginRight: "20px",
                textAlign: "center",
              }}
            >
              <article>
                <h2>{product.title}</h2>
                <Image
                  fluid={product.defaultProductVariant.images[0].asset.fluid}
                />
                <AddBtn product={product} />
              </article>
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
    allSanityProduct {
      edges {
        node {
          _id
          slug {
            current
          }
          title
          defaultProductVariant {
            title
            price
            images {
              asset {
                fluid(maxWidth: 700) {
                  ...GatsbySanityImageFluid
                }
              }
            }
          }
        }
      }
    }
  }
`;
