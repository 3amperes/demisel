import React from "react";
import PropTypes from "prop-types";
import { Link, navigate } from "gatsby";
import { getUser, isLoggedIn, logout } from "../services/auth";

const Header = ({ siteTitle }) => {
  const content = { message: "", login: true };
  if (isLoggedIn()) {
    content.message = `Hello, ${getUser().name}`;
  } else {
    content.message = "You are not logged in";
  }
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
      <nav>
        <Link to="/">Home</Link>
        <Link to="/pro/profile">Profile</Link>
        {isLoggedIn() ? (
          <a
            href="/"
            onClick={event => {
              event.preventDefault();
              logout(() => navigate(`/pro/login`));
            }}
          >
            Logout
          </a>
        ) : null}
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
