import React, { useEffect } from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import SEO from "../components/seo";
import Image from "gatsby-image";
import { isAuthenticated } from "../utils/auth";
import { applyDiscountCode, cleanDiscountCode } from "../utils/cart";
import { DEALERCODE } from "../utils/constants";
import { ProductList } from "../components/product";

const getPrice = productPrice =>
  isAuthenticated() ? Math.round(productPrice * 0.5) : productPrice;

const IndexPage = ({ data }) => {
  const products = data.allSanityProduct.edges;

  useEffect(() => {
    // mount
    console.log("mount !");
    window.Snipcart.api.cart.start().then(function(cart) {
      console.log(cart);
      if (isAuthenticated()) {
        applyDiscountCode(DEALERCODE);
      } else {
        cleanDiscountCode(DEALERCODE);
      }
    });
  }, []);
  return (
    <Layout>
      <SEO title="Accueil" />
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
          _id
          slug {
            current
          }
          title
        }
      }
    }
  }
`;

// defaultProductVariant {
//   title
//   price
//   images {
//     asset {
//       fluid(maxWidth: 700) {
//         ...GatsbySanityImageFluid
//       }
//     }
//   }
// }
