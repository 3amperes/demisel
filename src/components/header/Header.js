import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { up } from 'styled-breakpoints';
import { motion } from 'framer-motion';
import { Link } from 'gatsby';
import { Flex, Box, Text } from 'rebass/styled-components';
import { colors } from '@theme';
import Logo from '../logo';
// import Search from './Search';
import Basket from './Basket';

const MenuIcon = ({ isOpen }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 16" width="20">
    {isOpen ? (
      <path
        d="M0 .707L.707 0 15.96 15.252l-.707.707zM.004 14.739L5.94 9.184l.683.73L.687 15.47zM8.96 6.37L15.247.487l.683.73L9.643 7.1z"
        transform="translate(3)"
      ></path>
    ) : (
      <path d="M21.765 12.48v1H.195v-1zm0-5v1H.195v-1zm0-5v1H.195v-1z"></path>
    )}
  </svg>
);

const MenuButtonWrapper = styled(Flex)`
  align-items: center;
  position: relative;
  z-index: 10;

  ${up('tablet')} {
    display: none;
  }

  button {
    border: none;
    background: transparent;
    color: currentColor;
    cursor: pointer;
  }

  svg {
    fill: currentColor;
  }
`;

const MenuButton = ({ isOpen, onClick }) => (
  <MenuButtonWrapper>
    <motion.button onClick={onClick} whileTap={{ scale: 0.8 }}>
      <MenuIcon isOpen={isOpen}></MenuIcon>
    </motion.button>
  </MenuButtonWrapper>
);

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
  background-color: ${props => (props.isFloat ? 'transparent' : colors.white)};
  border-color: ${props => (props.isFloat ? 'transparent' : colors.whiteTwo)};
  border-style: solid;
  border-width: 0 0 1px 0;
  z-index: 1;

  *,
  *:before,
  *:after {
    box-sizing: border-box;
  }
`;

const NavItem = ({ children }) => (
  <Text
    fontSize={[40, 14]}
    fontFamily={['heading', 'text']}
    mr={[0, '2rem']}
    mb={[40, 0]}
  >
    {children}
  </Text>
);

const Navigation = styled.nav`
  position: absolute;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${colors.white};
  left: ${props => (props.isOpen ? 0 : '-100vw')};
  opacity: ${props => (props.isOpen ? 1 : 0)};
  transition: all 250ms ease;
  color: ${colors.black};

  ${up('tablet')} {
    position: relative;
    grid-area: navigation;
    width: auto;
    height: 100%;
    flex-direction: row;
    justify-content: flex-start;
    left: 0;
    opacity: 1;
    background-color: transparent;
    color: currentColor;
  }

  a {
    display: block;
    color: currentColor;
    text-decoration: none;
    text-align: center;
    overflow: hidden;
    position: relative;
    height: 30px;
    padding-top: 2px;
    line-height: 28px;

    ${up('tablet')} {
      display: inline-block;
    }

    &:after {
      content: '';
      display: block;
      width: 100%;
      height: 2px;
      background-color: currentColor;
      transform: translateX(-105%);
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

const Header = ({ isFloat }) => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  return (
    <Wrapper as="header" isFloat={isFloat}>
      <MenuButton
        onClick={() => setMenuIsOpen(!menuIsOpen)}
        isOpen={menuIsOpen}
      />
      <Navigation isOpen={menuIsOpen}>
        <NavItem>
          <Link to="/">Accueil</Link>
        </NavItem>
        <NavItem>
          <Link to="/collections">Collections</Link>
        </NavItem>
        <NavItem>
          <Link to="/shop">E-shop</Link>
        </NavItem>
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
