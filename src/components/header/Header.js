import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'gatsby';
import { Flex, Box } from 'rebass/styled-components';
import { colors, fontWeigths } from '@theme';
import Logo from '../logo';
import Search from './Search';
import Basket from './Basket';

const Wrapper = styled(Box)`
  display: grid;
  grid-template-rows: 88px;
  grid-template-columns: 1fr auto 1fr;
  grid-template-areas: 'navigation brand access';
  padding: 0 2rem;
  position: ${props => (props.isFloat ? 'absolute' : 'relative')};
  top: 0;
  left: 0;
  width: 100%;
  color: ${props => (props.isFloat ? colors.white : colors.black)};
  z-index: 9;
`;

const Navigation = styled.nav`
  grid-area: navigation;
  display: flex;
  align-items: center;

  a {
    display: inline-block;
    color: currentColor;
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
      background-color: currentColor;
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
const Access = styled(Flex)`
  grid-area: access;
  align-items: center;
  justify-content: flex-end;
`;

const Header = ({ siteTitle, isFloat }) => {
  const handleClickCart = e => {
    e.preventDefault();
    window.Snipcart.api.modal.show();
  };

  return (
    <Wrapper as="header" isFloat={isFloat}>
      <Navigation>
        <Link to="/">Accueil</Link>
        <Link to="/collections">Collections</Link>
        <Link to="/shop">E-shop</Link>
      </Navigation>
      <Brand>
        <Logo width={120} />
      </Brand>
      <Access>
        {/* <Search /> */}
        <Basket />
      </Access>
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
