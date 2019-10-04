import React from 'react';
import styled from 'styled-components';
import { Box } from 'rebass/styled-components';
const Svg = styled.svg`
  fill: currentColor;
`;

export default props => (
  <Box {...props}>
    <Svg viewBox="0 0 15.85 15.85" width={16}>
      <title>{'Search'}</title>
      <path d="M5.5 1A4.5 4.5 0 111 5.5 4.51 4.51 0 015.5 1m0-1A5.5 5.5 0 1011 5.5 5.5 5.5 0 005.5 0zM10.148 10.85l.707-.707 5 5-.708.707z" />
    </Svg>
  </Box>
);
