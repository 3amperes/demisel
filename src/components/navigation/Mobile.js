import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'gatsby';
import { colors } from '@theme';
import { Heading, Text, Box } from 'rebass/styled-components';

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

const MenuItem = ({ item }) => {
  const title = (
    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
      <Heading fontSize={40} color="black" textAlign="center">
        {item.title}
      </Heading>
    </motion.div>
  );
  return (
    <motion.li variants={variantItems}>
      {item.subItems ? (
        <div>
          {title}
          <Box pt="1rem">
            {item.subItems.map(subItem => (
              <Link
                key={subItem.id}
                to={`/shop/category/${subItem.slug.current}`}
              >
                <Text
                  fontSize={14}
                  color="greyishBrown"
                  mb="1rem"
                  textAlign="center"
                >
                  {subItem.title}
                </Text>
              </Link>
            ))}
          </Box>
        </div>
      ) : (
        <Link to={item.link}>{title}</Link>
      )}
    </motion.li>
  );
};

export const NavigationMobile = ({ data: { categories } }) => (
  <ul>
    {getItems(categories).map(i => (
      <MenuItem item={i} key={i.id} />
    ))}
  </ul>
);

const getItems = categories => {
  return [
    { id: 0, title: 'Accueil', link: '/' },
    {
      id: 1,
      title: 'Collections',
      link: '/collections',
    },
    {
      id: 2,
      title: 'E-shop',
      link: '/shop',
      subItems: categories,
    },
  ];
};
