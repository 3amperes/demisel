import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Flex, Box } from 'rebass/styled-components';
import { colors } from '@theme';
const Svg = styled.svg`
  fill: currentColor;
`;

export const BasketIcon = ({ width = 16, ...rest }) => (
  <Box {...rest}>
    <Svg viewBox="0 0 16 16" width={width}>
      <title>{'Basket'}</title>
      <path d="M16 16H0V5h3v1H1v9h14V6h-2V5h3v11z" />
      <path d="M12 9h-1V1H5v8H4V0h8v9z" />
      <path d="M6 5h4v1H6z" />
    </Svg>
  </Box>
);

const styles = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: colors.white,
  color: colors.black,
  borderRadius: '50%',
  width: 48,
  height: 48,
  outline: 'none',
  border: 'none',
  cursor: 'pointer',
  marginLeft: '2rem',
  position: 'relative',
};

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
  <motion.button
    style={styles}
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
    <Count className="snipcart-items-count"></Count>
  </motion.button>
);
