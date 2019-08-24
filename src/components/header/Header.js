import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'gatsby';
import { Flex, Box } from 'rebass';
import { colors, fontWeigths } from '@theme';
// import { login, logout, getProfile, isAuthenticated } from '../../utils/auth';

const Wrapper = styled(Box)`
  display: grid;
  grid-template-rows: 88px;
  grid-template-columns: 1fr auto 1fr;
  grid-template-areas: 'navigation brand acess';
  padding: 0 2rem;
`;

const Navigation = styled.nav`
  grid-area: navigation;
  display: flex;
  align-items: center;

  a {
    display: inline-block;
    color: ${colors.black};
    font-weight: ${fontWeigths.text.emphase};
    font-size: 14px;
    text-decoration: none;
    margin-right: 2rem;
    overflow: hidden;
    position: relative;
    height: 30px;
    padding-top: 2px;
    line-height: 28px;

    &:after {
      content: '';
      display: block;
      width: 100%;
      height: 2px;
      background-color: ${colors.black};
      transform: translateX(-100%);
      transition: transform 250ms ease-in-out;
    }

    &:hover:after {
      transform: translateX(0);
    }
  }
`;

const Brand = styled(Flex)`
  grid-area: brand;
  align-items: center;
  justify-content: center;
`;
const Acess = styled(Flex)`
  grid-area: acess;
  align-items: center;
  justify-content: flex-end;
`;

const Header = ({ siteTitle }) => {
  // const content = { message: "", login: true };
  // if (isAuthenticated()) {
  //   content.message = `Hello, ${getProfile().name}`;
  // } else {
  //   content.message = "You are not logged in";
  // }

  // const handleLogin = e => {
  //   console.log("handle login", isAuthenticated());
  //   e.preventDefault();
  //   if (!isAuthenticated()) {
  //     login();
  //   } else {
  //     logout();
  //   }
  // };

  const handleClickCart = e => {
    e.preventDefault();
    console.log('click basket');
    window.Snipcart.api.modal.show();
  };

  return (
    <Wrapper as="header">
      <Navigation>
        <Link to="/">Accueil</Link>
        <Link to="/shop">E-shop</Link>
        <Link to="/list">Liste des pages</Link>
      </Navigation>
      <Brand>Demisel</Brand>
      <Acess>
        <span>search</span>
        <button onClick={handleClickCart} type="button">
          panier
        </button>
      </Acess>
    </Wrapper>
  );
};

Header.propTypes = {
  siteTitle: PropTypes.string,
};

Header.defaultProps = {
  siteTitle: ``,
};

export default Header;
