import React from 'react';
import styled from 'styled-components';
import { colors } from '@theme';

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
`;

export default ({ onClick, isOpen }) => (
  <div>
    <MenuToggleWrapper onClick={onClick}>
      <MenuIcon isOpen={isOpen} />
    </MenuToggleWrapper>
  </div>
);
