import React, { useState } from 'react';
import styled from 'styled-components';
import { up } from 'styled-breakpoints';
import { motion } from 'framer-motion';
import { Link } from 'gatsby';
import Image from 'gatsby-image';
import { Text, Flex, Box } from 'rebass/styled-components';
import { colors } from '@theme';
import { container, navLink } from '@utils/mixins';
import { getOtherLinks } from './utils';

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

  a,
  button {
    border: none;
    background: transparent;

    ${navLink};
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

const SubWrapper = styled(Box)`
  ${container};
  width: 100%;
`;

export const NavigationDesktop = ({ toggleMenu, ...rest }) => {
  return (
    <Wrapper>
      <Flex {...rest}>
        <NavItem>
          <Link to="/">Accueil</Link>
        </NavItem>
        <NavItem>
          <Link to="/collections">Collections</Link>
        </NavItem>
        <NavItem>
          <button onClick={toggleMenu}>E-shop</button>
        </NavItem>
      </Flex>
    </Wrapper>
  );
};

const CategoryItem = styled(motion.li)`
  a {
    ${navLink};
  }
`;

const thumbnails = {
  show: { opacity: 1, x: 0 },
  hide: { opacity: 0, x: 16 },
};

const Thumbnail = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
`;

export const CategoriesDesktop = ({
  data: { categories, collections, baseThumb, areDiscountsEnabled },
}) => {
  const baseThumbId = 'baseThumb';
  const [currentId, setCurrentId] = useState(baseThumbId);
  const handleMouseEnter = id => {
    setCurrentId(id);
  };
  const handleMouseLeave = () => {
    setCurrentId(baseThumbId);
  };
  const all = [...categories, ...collections];
  return (
    <SubWrapper>
      <Flex width={1}>
        <Box width={1 / 3} style={{ position: 'relative' }}>
          <Thumbnail
            animate={currentId === baseThumbId ? 'show' : 'hide'}
            variants={thumbnails}
            initial="show"
          >
            {baseThumb && <Image fixed={baseThumb.asset.fixed} />}
          </Thumbnail>
          {all.map(item => {
            const isCurrent = item.id === currentId;
            return (
              <Thumbnail
                animate={isCurrent ? 'show' : 'hide'}
                variants={thumbnails}
                initial="hide"
                key={item.id}
              >
                {item.thumbnail && <Image fixed={item.thumbnail.asset.fixed} />}
              </Thumbnail>
            );
          })}
        </Box>
        <Flex width={2 / 3}>
          <Box width={1 / 3} px={20} color="black">
            <Text fontSize={12} fontWeight={600} color="warmGrey" mb="0.5rem">
              Catégories
            </Text>
            <ul>
              <CategoryItem key="all">
                <Link to={`/shop`}>
                  <Text fontSize={14}>Tous les bijoux</Text>
                </Link>
              </CategoryItem>
              {categories.map(category => {
                return (
                  <CategoryItem
                    key={category.id}
                    onMouseEnter={() => handleMouseEnter(category.id)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <Link to={`/shop/category/${category.slug.current}`}>
                      <Text fontSize={14}>{category.title}</Text>
                    </Link>
                  </CategoryItem>
                );
              })}
            </ul>
          </Box>

          <Box width={1 / 3} px={20} color="black">
            <Text fontSize={12} fontWeight={600} color="warmGrey" mb="0.5rem">
              Collections
            </Text>
            <ul>
              {collections.map(collection => {
                return (
                  <CategoryItem
                    key={collection.id}
                    onMouseEnter={() => handleMouseEnter(collection.id)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <Link to={`/shop/?collections=${collection.id}`}>
                      <Text fontSize={14}>{collection.title}</Text>
                    </Link>
                  </CategoryItem>
                );
              })}
            </ul>
          </Box>
          {getOtherLinks(areDiscountsEnabled).length > 0 && (
            <Box width={1 / 3} px={20} color="black">
              <ul>
                {getOtherLinks(areDiscountsEnabled).map(item => {
                  return (
                    <CategoryItem key={item.id}>
                      <Link to={item.link}>
                        <Text fontSize={14}>{item.title}</Text>
                      </Link>
                    </CategoryItem>
                  );
                })}
              </ul>
            </Box>
          )}
        </Flex>
      </Flex>
    </SubWrapper>
  );
};
