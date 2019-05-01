import React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";
import { getProfile, isAuthenticated } from "../utils/auth";

const Header = ({ siteTitle }) => {
  const content = { message: "", login: true };
  if (isAuthenticated()) {
    content.message = `Hello, ${getProfile().name}`;
  } else {
    content.message = "You are not logged in";
  }

  const handleClickCart = e => {
    e.preventDefault();
    console.log(window.Snipcart);
    window.Snipcart.subscribe("cart.opened", function() {
      console.log("Snipcart popup is visible");
    });
  };
  return (
    <div
      style={{
        display: "flex",
        flex: "1",
        justifyContent: "space-between",
        borderBottom: "1px solid #d1c1e0",
      }}
    >
      <Link
        to="/"
        style={{
          textDecoration: `none`,
        }}
      >
        {siteTitle}
      </Link>
      <span>{content.message}</span>
      <button className="snipcart-checkout" onClick={handleClickCart}>
        Cart
      </button>

      <nav>
        <Link to="/">Home</Link>
        <Link to="/account">Account</Link>
      </nav>
    </div>
  );
};

Header.propTypes = {
  siteTitle: PropTypes.string,
};

Header.defaultProps = {
  siteTitle: ``,
};

export default Header;
