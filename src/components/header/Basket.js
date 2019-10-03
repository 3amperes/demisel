import React from 'react';
import styled from 'styled-components';
import { Flex } from 'rebass/styled-components';

const Wrapper = styled(Flex)`
  border: none;
  outline: 0;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  cursor: pointer;

  svg {
    fill: currentColor;
  }
`;

export default props => (
  <Wrapper as="button" bg="lipstick" color="white" size={48} {...props}>
    <svg viewBox="0 0 16 16" width={16}>
      <title>{'Basket'}</title>
      <path d="M16 16H0V5h3v1H1v9h14V6h-2V5h3v11z" />
      <path d="M12 9h-1V1H5v8H4V0h8v9z" />
      <path d="M6 5h4v1H6z" />
    </svg>
  </Wrapper>
);
