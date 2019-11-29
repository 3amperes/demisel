import React, { useContext } from 'react';
import styled from 'styled-components';
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
  height: 48px;
  padding: 0 1rem;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid rgba(256, 256, 256, 0.2);
  position: relative;
  z-index: 9;

  button {
    border: none;
    outline: 0;
    background: transparent;
    color: currentColor;
    cursor: pointer;
    margin-left: auto;
    svg {
      fill: currentColor;
    }
  }
`;

export default () => {
  const {
    state: { isBannerClosed },
    dispatch,
  } = useContext(GlobalContext);
  const closeBanner = () => {
    dispatch({ type: 'banner_is_closed' });
  };
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
        const displayBanner = isDisplay && !isBannerClosed;
        return displayBanner ? (
          <Wrapper bg="lipstick" color="white">
            {title && (
              <Heading fontSize="16px" lineHeight="12px" ml="auto" mr="1rem">
                {title}
              </Heading>
            )}
            {description && (
              <Text fontSize="12px" lineHeight="12px" pt="4px">
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
        ) : null;
      }}
    />
  );
};
