import React, { useState } from 'react';
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
  color: currentColor;

  a {
    color: currentColor;
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

  const toggleMenu = () => setMenuIsOpen(!isMenuOpen);
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
                  fixed(width: 320) {
                    ...GatsbySanityImageFixed
                  }
                }
                alt
              }
            }
          }
          baseThumb: allSanityConfig {
            edges {
              node {
                menuBaseThumb {
                  asset {
                    fixed(width: 320) {
                      ...GatsbySanityImageFixed
                    }
                  }
                }
              }
            }
          }
        }
      `}
      render={data => {
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
        return (
          <>
            <Wrapper
              as="header"
              isFloat={isFloat}
              px={['1rem', '2rem']}
              color={isFloat && !isMenuOpen ? 'white' : 'black'}
              bg={isFloat ? 'transparent' : 'white'}
            >
              {isDesktop ? (
                <NavigationDesktop toggleMenu={toggleMenu} />
              ) : (
                <MenuToggle isOpen={isMenuOpen} onClick={toggleMenu} />
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

            <SubMenu isOpen={isMenuOpen} isFloat={isFloat}>
              {isDesktop ? (
                <CategoriesDesktop
                  data={{
                    categories,
                    collections,
                    baseThumb: data.baseThumb.edges[0].node.menuBaseThumb,
                  }}
                />
              ) : (
                <NavigationMobile data={{ categories, collections }} />
              )}
            </SubMenu>
          </>
        );
      }}
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
