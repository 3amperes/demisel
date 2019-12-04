import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import { up } from 'styled-breakpoints';
import { Flex, Heading, Text } from 'rebass/styled-components';
import { StaticQuery, graphql } from 'gatsby';
import { motion } from 'framer-motion';
import { GlobalContext } from '@components/globalStore';

const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 16" width="16">
    <path
      d="M0 .707L.707 0 15.96 15.252l-.707.707zM.004 14.739L5.94 9.184l.683.73L.687 15.47zM8.96 6.37L15.247.487l.683.73L9.643 7.1z"
      transform="translate(3)"
    ></path>
  </svg>
);

const Wrapper = styled(Flex)`
  width: 100%;
  padding: 8px 1rem;
  padding-right: 3rem;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid rgba(256, 256, 256, 0.2);
  position: relative;
  z-index: 9;
  flex-direction: column;
  min-height: 80px;
  ${up('tablet')} {
    min-height: 50px;
  }

  ${up('tablet')} {
    flex-direction: row;
  }

  button {
    border: none;
    outline: 0;
    background: transparent;
    color: currentColor;
    cursor: pointer;
    position: absolute;
    right: 0.5rem;
    svg {
      fill: currentColor;
    }
  }
`;

const Banner = ({ title, description, isDisplay }) => {
  const { dispatch } = useContext(GlobalContext);
  const closeBanner = () => {
    dispatch({ type: 'toggle_banner', payload: false });
  };
  useEffect(() => {
    isDisplay && dispatch({ type: 'toggle_banner', payload: true });
  }, [isDisplay]);
  return (
    <Wrapper bg="lipstick" color="white">
      {title && (
        <Heading
          fontSize="16px"
          lineHeight="12px"
          mr={[0, 16]}
          mb={['4px', 0]}
          textAlign={['center', 'left']}
        >
          {title}
        </Heading>
      )}
      {description && (
        <Text
          fontSize="12px"
          lineHeight="12px"
          pt="4px"
          textAlign={['center', 'left']}
        >
          {description}
        </Text>
      )}
      <motion.button
        onClick={closeBanner}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <CloseIcon />
      </motion.button>
    </Wrapper>
  );
};

export default () => {
  return (
    <StaticQuery
      query={graphql`
        query {
          config: allSanityConfig {
            edges {
              node {
                banner {
                  isDisplay
                  title
                  description
                }
              }
            }
          }
        }
      `}
      render={data => {
        const {
          isDisplay,
          title,
          description,
        } = data.config.edges[0].node.banner;
        return (
          <Banner
            isDisplay={isDisplay}
            title={title}
            description={description}
          />
        );
      }}
    />
  );
};
