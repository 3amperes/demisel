import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'gatsby';
import { Flex, Box } from 'rebass/styled-components';
import { colors } from '@theme';
import { useBreakpoint } from '@utils/hooks';
import Logo from '../logo';
// import Search from './Search';
import Basket from './Basket';
import { NavigationDesktop, MenuToggle, SubMenu } from '../navigation';

const Wrapper = styled(Box)`
  display: grid;
  grid-template-rows: 88px;
  grid-template-columns: 1fr auto 1fr;
  grid-template-areas: 'navigation brand access';
  align-items: center;
  position: ${props => (props.isFloat ? 'absolute' : 'relative')};
  top: 0;
  left: 0;
  width: 100%;
  color: ${props => (props.isFloat ? colors.white : colors.black)};
  background-color: ${props => (props.isFloat ? 'transparent' : colors.white)};
  border-color: ${props => (props.isFloat ? 'transparent' : colors.whiteTwo)};
  border-style: solid;
  border-width: 0 0 1px 0;
  z-index: 2;

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
  const isDesktop = useBreakpoint('desktop');
  const [isMenuOpen, setMenuIsOpen] = useState(false);
  return (
    <>
      <Wrapper as="header" isFloat={isFloat} px={['1rem', '2rem']}>
        {isDesktop ? (
          <NavigationDesktop />
        ) : (
          <MenuToggle
            isOpen={isMenuOpen}
            onClick={() => setMenuIsOpen(!isMenuOpen)}
          />
        )}
        <Brand>
          <Link to="/">
            <Logo width={[120, 180]} />
          </Link>
        </Brand>
        <Access>
          {/* <Search /> */}
          <Basket />
        </Access>
      </Wrapper>
      <SubMenu isOpen={isMenuOpen} />
    </>
  );
};

Header.propTypes = {
  siteTitle: PropTypes.string,
};

Header.defaultProps = {
  siteTitle: ``,
};

export default Header;
