import React from 'react';
import styled from 'styled-components';
import { up } from 'styled-breakpoints';
import { motion } from 'framer-motion';
import { Flex, Box } from 'rebass/styled-components';
import { colors } from '@theme';
const Svg = styled.svg`
  fill: currentColor;
`;

export const BasketIcon = ({ ...rest }) => (
  <Box {...rest} width={[12, 16]}>
    <Svg viewBox="0 0 16 16" width="100%">
      <title>{'Basket'}</title>
      <path d="M16 16H0V5h3v1H1v9h14V6h-2V5h3v11z" />
      <path d="M12 9h-1V1H5v8H4V0h8v9z" />
      <path d="M6 5h4v1H6z" />
    </Svg>
  </Box>
);

const Wrapper = styled.div`
  margin-left: 2rem;
  button {
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${colors.white};
    color: ${colors.black};
    border-radius: 50%;
    width: 32px;
    height: 32px;
    outline: none;
    border: none;
    cursor: pointer;
    position: relative;

    ${up('tablet')} {
      width: 48px;
      height: 48px;
    }
  }
`;

const Count = styled(Flex)`
  justify-content: center;
  align-items: center;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  color: currentColor;
  font-size: 10px;
  line-height: 1;
  position: absolute;
  top: 8px;
  right: 8px;
`;

export default props => (
  <Wrapper width={[32, 48]}>
    <motion.button
      whileHover={{
        scale: 1.1,
        backgroundColor: colors.lipstick,
        color: colors.white,
      }}
      whileTap={{
        scale: 0.9,
        backgroundColor: colors.lipstick,
        color: colors.white,
      }}
      className="snipcart-checkout"
    >
      <BasketIcon />
      <Count className="snipcart-items-count" />
    </motion.button>
  </Wrapper>
);
