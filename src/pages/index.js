import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import SEO from "../components/seo";
import Image from "gatsby-image";
import { isAuthenticated } from "../utils/auth";

const getPrice = productPrice =>
  isAuthenticated() ? Math.round(productPrice * 0.5) : productPrice;

const AddBtn = ({ product }) => {
  const price = getPrice(product.defaultProductVariant.price);
  return (
    <button
      className="snipcart-add-item"
      data-item-id={product._id}
      data-item-name={product.defaultProductVariant.title}
      data-item-price={price}
      data-item-url="https://demiselbijoux.netlify.com"
      data-item-description={product.name}
    >
      Ajouter au panier
    </button>
  );
};

const IndexPage = ({ data }) => {
  const products = data.allSanityProduct.edges;
  return (
    <Layout>
      <SEO title="Accueil" />
      <div className="snipcart-summary">
        <button className="snipcart-user-email snipcart-user-profile">
          Customer dashboard
        </button>
      </div>
      <div className="snipcart-summary">
        Number of items: <span className="snipcart-total-items" />
        <br />
        Total price: <span className="snipcart-total-price" />
      </div>
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
          const price = getPrice(product.defaultProductVariant.price);
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
                <p>{price} €</p>
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
