import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link, StaticQuery, graphql } from 'gatsby';
import { Flex, Box } from 'rebass/styled-components';
import { colors } from '@theme';
import { useBreakpoint } from '@utils/hooks';
import Logo from '../logo';
// import Search from './Search';
import Basket from './Basket';
import {
  NavigationDesktop,
  CategoriesDesktop,
  MenuToggle,
  SubMenu,
  NavigationMobile,
} from '../navigation';
import { GlobalContext } from '@components/globalStore';

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
  border-color: ${props => (props.isFloat ? 'transparent' : colors.whiteTwo)};
  border-style: solid;
  border-width: 0 0 1px 0;
  z-index: 5;

  *,
  *:before,
  *:after {
    box-sizing: border-box;
  }

  .navigation {
    grid-area: navigation;
  }
  a {
    color: currentColor;
  }
`;

const Access = styled(Flex)`
  grid-area: access;
  align-items: center;
  justify-content: flex-end;
`;

const Data = ({ data, toggleMenu, isFloat, isDesktop, isMenuOpen }) => {
  const { dispatch } = useContext(GlobalContext);
  const areDiscountsEnabled = data.config.edges[0].node.areDiscountsEnabled;
  const categories = data.categories.nodes.filter(category =>
    data.productsGroupByCategory.group
      .map(item => item.fieldValue)
      .includes(category._id)
  );
  const collections = data.collections.nodes.filter(collection =>
    data.productsGroupByCollection.group
      .map(item => item.fieldValue)
      .includes(collection._id)
  );
  const config = data.config.edges[0].node;
  useEffect(() => {
    if (!areDiscountsEnabled) return;
    dispatch({ type: 'discounts_are_enabled' });
  }, [dispatch, areDiscountsEnabled]);
  return (
    <>
      <Wrapper
        as="header"
        isFloat={isFloat}
        px={['1rem', '2rem']}
        color={isFloat && !isMenuOpen ? 'white' : 'black'}
        bg={isFloat && !isMenuOpen ? 'transparent' : 'white'}
      >
        {isDesktop ? (
          <NavigationDesktop toggleMenu={toggleMenu} />
        ) : (
          <MenuToggle isOpen={isMenuOpen} onClick={toggleMenu} />
        )}
        <Link to="/">
          <Logo width={150} />
        </Link>
        <Access>
          {/* <Search /> */}
          <Basket />
        </Access>
      </Wrapper>

      <SubMenu isOpen={isMenuOpen} isFloat={isFloat}>
        {isDesktop ? (
          <CategoriesDesktop
            data={{
              categories,
              collections,
              baseThumb: config.menuBaseThumb,
              areDiscountsEnabled: config.areDiscountsEnabled,
            }}
          />
        ) : (
          <NavigationMobile
            data={{
              categories,
              collections,
              areDiscountsEnabled: config.areDiscountsEnabled,
            }}
          />
        )}
      </SubMenu>
    </>
  );
};

const Header = ({ isFloat }) => {
  const isDesktop = useBreakpoint('desktop');
  const [isMenuOpen, setMenuIsOpen] = useState(false);

  const toggleMenu = () => setMenuIsOpen(!isMenuOpen);

  useEffect(() => {
    if (document === 'undefined') return;
    // Prevent scrolling effect
    if (!isDesktop && isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'visible';
    }
  }, [isMenuOpen, isDesktop]);

  return (
    <StaticQuery
      query={graphql`
        query {
          categories: allSanityCategory(sort: { fields: title, order: ASC }) {
            nodes {
              _id
              id
              slug {
                current
              }
              title
              thumbnail {
                asset {
                  fixed(width: 320) {
                    ...GatsbySanityImageFixed
                  }
                }
                alt
              }
            }
          }
          productsGroupByCategory: allSanityProduct(limit: 2000) {
            group(field: category____id) {
              fieldValue
              totalCount
            }
          }
          productsGroupByCollection: allSanityProduct(limit: 2000) {
            group(field: collections____id) {
              fieldValue
              totalCount
            }
          }
          collections: allSanityCollection(
            sort: { fields: title, order: ASC }
          ) {
            nodes {
              _id
              id
              title
              thumbnail {
                asset {
                  fixed(width: 320, height: 255) {
                    ...GatsbySanityImageFixed
                  }
                }
                alt
              }
              mobileThumbnail {
                asset {
                  fixed(width: 320, height: 255) {
                    ...GatsbySanityImageFixed
                  }
                }
                alt
              }
            }
          }
          config: allSanityConfig {
            edges {
              node {
                areDiscountsEnabled
                menuBaseThumb {
                  asset {
                    fixed(width: 320, height: 255) {
                      ...GatsbySanityImageFixed
                    }
                  }
                }
              }
            }
          }
        }
      `}
      render={data => (
        <Data
          data={data}
          isFloat={isFloat}
          toggleMenu={toggleMenu}
          isDesktop={isDesktop}
          isMenuOpen={isMenuOpen}
        />
      )}
    />
  );
};

Header.propTypes = {
  siteTitle: PropTypes.string,
};

Header.defaultProps = {
  siteTitle: ``,
};

export default Header;
