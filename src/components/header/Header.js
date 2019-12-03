import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { up } from 'styled-breakpoints';
import { motion } from 'framer-motion';
import { Link } from 'gatsby';
import { Flex, Box, Text } from 'rebass/styled-components';
import { colors } from '@theme';
import Logo from '../logo';
// import Search from './Search';
import Navigation from '../navigation';
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

  .navigation {
    grid-area: navigation;
  }
`;

const Brand = styled(Flex)`
  grid-area: brand;
  align-items: center;
  justify-content: center;

  a {
    color: inherit;
  }
`;
const Access = styled(Flex)`
  grid-area: access;
  align-items: center;
  justify-content: flex-end;
`;

const Header = ({ isFloat }) => {
  return (
    <Wrapper as="header" isFloat={isFloat}>
      <Navigation className="navigation" />
      <Brand>
        <Link to="/">
          <Logo width={150} />
        </Link>
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
