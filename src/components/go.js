import React from 'react';
import { Box } from 'rebass/styled-components';
import { colors } from '@theme';

const Go = ({ size = 46, bgColor = colors.white, ...rest }) => (
  <Box width={size} {...rest}>
    <svg viewBox="0 0 48 48" width="100%">
      <circle cx={24} cy={24} r={24} fill={bgColor} />
      <path
        fill="currentColor"
        d="M22.11 32.78l-2-2L26.89 24l-6.78-6.78 2-2L30.9 24l-8.79 8.78z"
      />
    </svg>
  </Box>
);

Go.defaultProps = {
  color: colors.lipstick,
};

export default Go;
