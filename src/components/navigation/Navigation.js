import React, { useState } from 'react';
import styled from 'styled-components';
import { up } from 'styled-breakpoints';
import { motion } from 'framer-motion';
import { Link } from 'gatsby';
import { Flex, Box, Text } from 'rebass/styled-components';
import { colors } from '@theme';
import { useBreakpoint } from '@utils/hooks';

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

const Wrapper = styled.nav`
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

export default ({ props }) => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  const isDesktop = useBreakpoint('desktop');

  return isDesktop ? (
    <Wrapper isOpen={menuIsOpen} {...props}>
      <NavItem>
        <Link to="/">Accueil</Link>
      </NavItem>
      <NavItem>
        <Link to="/collections">Collections</Link>
      </NavItem>
      <NavItem>
        <Link to="/shop">E-shop</Link>
      </NavItem>
    </Wrapper>
  ) : (
    <div>menu mobile</div>
  );
};
