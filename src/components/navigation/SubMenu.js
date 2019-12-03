import React, { useRef } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { StaticQuery, Link, graphql } from 'gatsby';
import { colors } from '@theme';
import { useDimensions } from '@utils/hooks';
import { Heading, Text, Box } from 'rebass/styled-components';

const nav = {
  open: {
    top: 0,
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: (height = 1000) => ({
    top: -height,
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  }),
};

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

const Wrapper = styled.div`
  position: relative;
  z-index: 1;
  nav {
    position: absolute;
    width: 100vw;
    height: 100vh;
    left: 0;
    padding-top: 2rem;
    padding-bottom: 2rem;
    background: ${colors.white};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;
    overflow-y: auto;
  }

  ul {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;
  }

  li {
    list-style: none;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    cursor: pointer;
    a {
      color: inherit;
      text-decoration: none;
    }
  }
`;

const MenuItem = ({ item }) => {
  const title = (
    <Heading fontSize={40} color="black" textAlign="center">
      {item.title}
    </Heading>
  );
  return (
    <motion.li
      variants={variantItems}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      {item.subItems ? (
        <div>
          {title}
          <Box pt="1rem">
            {item.subItems.map(subItem => (
              <Link key={subItem.id} to={subItem.link}>
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

export const Navigation = () => (
  <StaticQuery
    query={graphql`
      query {
        categories: allSanityCategory {
          nodes {
            _id
            id
            slug {
              current
            }
            title
          }
        }
        productsGroupByCategories: allSanityProduct(limit: 2000) {
          group(field: category____id) {
            fieldValue
            totalCount
          }
        }
      }
    `}
    render={data => {
      const categories = data.categories.nodes.filter(category =>
        data.productsGroupByCategories.group
          .map(item => item.fieldValue)
          .includes(category._id)
      );
      return (
        <ul>
          {getItems(categories).map(i => (
            <MenuItem item={i} key={i.id} />
          ))}
        </ul>
      );
    }}
  />
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

export default ({ isOpen }) => {
  const containerRef = useRef(null);
  const { height } = useDimensions(containerRef);

  return (
    <Wrapper>
      <motion.nav
        initial={false}
        animate={isOpen ? 'open' : 'closed'}
        custom={height}
        ref={containerRef}
        variants={nav}
      >
        <Navigation />
      </motion.nav>
    </Wrapper>
  );
};
