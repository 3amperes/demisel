import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'gatsby';
import { colors } from '@theme';
import { Heading, Text, Box } from 'rebass/styled-components';
import { getOtherLinks } from './utils';
import SubMenu from './SubMenu';

const MenuIcon = ({ isOpen }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 22 16"
    width="20"
    fill={isOpen ? colors.black : 'currentColor'}
  >
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

const MenuToggleWrapper = styled.button`
  align-items: center;
  position: relative;
  z-index: 10;
  border: none;
  background: transparent;
  cursor: pointer;
  outline: 0;
  color: currentColor;
`;

export const MenuToggle = ({ onClick, isOpen }) => (
  <div>
    <MenuToggleWrapper onClick={onClick}>
      <MenuIcon isOpen={isOpen} />
    </MenuToggleWrapper>
  </div>
);

const Wrapper = styled.ul`
  margin: auto;
  > li {
    list-style: none;
    text-align: center;
    margin-bottom: 20px;
    cursor: pointer;
    a {
      color: inherit;
      text-decoration: none;
    }
  }
`;

const variantItems = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
};

const shopMenu = {
  open: {
    maxHeight: 'none',
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  close: {
    maxHeight: 0,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
};

const MenuItem = ({ item, ...rest }) => {
  const title = (
    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
      <Heading fontSize={40} color="black" textAlign="center">
        {item.title}
      </Heading>
    </motion.div>
  );
  return (
    <motion.li variants={variantItems} key={item.id} {...rest}>
      {!item.link ? title : <Link to={item.link}>{title}</Link>}
    </motion.li>
  );
};

const ShopMenu = styled(motion.div)`
  text-align: center;
  overflow: hidden;
  a {
    color: inherit;
    text-decoration: none;
  }
`;

export const NavigationMobile = ({
  data: { categories, collections, areDiscountsEnabled },
}) => {
  const [shopMenuIsOpen, setShopMenuIsOpen] = useState(false);
  const toggleSubMenu = () => {
    setShopMenuIsOpen(!shopMenuIsOpen);
  };
  return (
    <Wrapper>
      <MenuItem item={{ id: 0, title: 'Accueil', link: '/' }} />
      <MenuItem
        item={{
          id: 1,
          title: 'Collections',
          link: '/collections',
        }}
      />
      <MenuItem
        item={{
          id: 1,
          title: 'E-Shop',
        }}
        onClick={toggleSubMenu}
      />
      <ShopMenu
        variants={shopMenu}
        animate={shopMenuIsOpen ? 'open' : 'close'}
        initial="close"
      >
        <Text fontSize={12} fontWeight={600} color="warmGrey" mb="0.5rem">
          Catégories
        </Text>
        <ul>
          <Link to={`/shop`}>
            <Text fontSize={14}>Tous les bijoux</Text>
          </Link>
          {categories.map(category => {
            return (
              <Link
                key={category.id}
                to={`/shop/category/${category.slug.current}`}
              >
                <Text fontSize={14} py="0.25rem">
                  {category.title}
                </Text>
              </Link>
            );
          })}
        </ul>
        <Text
          fontSize={12}
          fontWeight={600}
          color="warmGrey"
          mt="1rem"
          mb="0.5rem"
        >
          Collections
        </Text>
        <ul>
          {collections.map(collection => {
            return (
              <Link
                key={collection.id}
                to={`/shop?collections=${collection.id}`}
              >
                <Text fontSize={14} py="0.25rem">
                  {collection.title}
                </Text>
              </Link>
            );
          })}
        </ul>
        {getOtherLinks(areDiscountsEnabled).length > 0 && (
          <Box py={20}>
            <ul>
              {getOtherLinks(areDiscountsEnabled).map(item => {
                return (
                  <Link key={item.id} to={item.link}>
                    <Text fontSize={14}>{item.title}</Text>
                  </Link>
                );
              })}
            </ul>
          </Box>
        )}
      </ShopMenu>
      <MenuItem
        item={{
          id: 'contact',
          title: 'Contact',
          link: '/contact',
        }}
        onClick={toggleSubMenu}
      />
    </Wrapper>
  );
};
