import React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";
import { login, logout, getProfile, isAuthenticated } from "../utils/auth";

const Header = ({ siteTitle }) => {
  const content = { message: "", login: true };
  if (isAuthenticated()) {
    content.message = `Hello, ${getProfile().name}`;
  } else {
    content.message = "You are not logged in";
  }

  const handleLogin = e => {
    console.log("handle login", isAuthenticated());
    e.preventDefault();
    if (!isAuthenticated()) {
      login();
    } else {
      logout();
    }
  };

  const handleClickCart = e => {
    e.preventDefault();
    window.Snipcart.subscribe("cart.opened", function() {
      console.log("Snipcart popup is visible");
    });
  };

  return (
    <div
      style={{
        display: "flex",
        flex: "1",
        padding: ".5rem",
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

      <nav>
        <Link to="/">Home</Link>
        <button className="snipcart-checkout" onClick={handleClickCart}>
          Cart
        </button>
        <button onClick={handleLogin}>
          {isAuthenticated() ? "logout" : "login"}
        </button>
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
