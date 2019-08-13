import React, { useEffect } from "react";
import { Link } from "gatsby";
import Layout from "../components/layout";
import SEO from "../components/seo";
import { isAuthenticated } from "../utils/auth";
import { applyDiscountCode, cleanDiscountCode } from "../utils/cart";
import { DEALERCODE } from "../utils/constants";

const IndexPage = () => {
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
      slider <br /> contenu <br /> etc
    </Layout>
  );
};

export default IndexPage;
