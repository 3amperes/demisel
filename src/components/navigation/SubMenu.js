import React, { useRef } from 'react';
import styled from 'styled-components';
import { up } from 'styled-breakpoints';
import { motion } from 'framer-motion';
import { colors } from '@theme';
import { useDimensions } from '@utils/hooks';

const nav = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.2,
    },
  },
  closed: (height = 500) => ({
    y: -height,
    opacity: 0,
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  }),
};

const Wrapper = styled.div`
  position: relative;
  z-index: 1;
`;
const Nav = styled(motion.nav)`
  position: absolute;
  width: 100%;
  height: ${props => (props.isFloat ? 'calc(100vh + 89px)' : '100vh')};
  left: 0;
  top: -89px;
  padding-top: 178px;
  padding-bottom: 89px;
  background: ${colors.white};
  overflow-y: auto;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-bottom: solid 1px ${colors.whiteTwo};
  box-shadow: 0px 1px 8px rgba(0, 0, 0, 0.05);

  ${up('desktop')} {
    height: auto;
  }
`;

export default ({ isOpen, isFloat, children }) => {
  const containerRef = useRef(null);
  const { height } = useDimensions(containerRef);

  return (
    <Wrapper>
      <Nav
        initial="closed"
        animate={isOpen ? 'open' : 'closed'}
        custom={height !== 0 ? height : 800}
        variants={nav}
        isFloat={isFloat}
        ref={containerRef}
      >
        {children}
      </Nav>
    </Wrapper>
  );
};
