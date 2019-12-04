import React from 'react';
import styled from 'styled-components';
import { up } from 'styled-breakpoints';
import { Link } from 'gatsby';
import { Text } from 'rebass/styled-components';
import { colors } from '@theme';

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

export const NavigationDesktop = props => {
  return (
    <Wrapper {...props}>
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
  );
};

export const CategoriesDesktop = props => <p>categories</p>;
