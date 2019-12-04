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
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: (height = 1000) => ({
    y: -height,
    opacity: 0,
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  }),
};

const Wrapper = styled.div`
  position: relative;
  z-index: 1;
`;
const Nav = styled(motion.nav)`
  position: absolute;
  width: 100vw;
  height: 100vh;
  left: 0;
  top: -100%;
  padding-top: ${props => (props.isFloat ? '89px' : '2rem')};
  padding-bottom: 2rem;
  background: ${colors.white};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  overflow-y: auto;

  ${up('tablet')} {
    height: auto;
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

export default ({ isOpen, isFloat, children }) => {
  const containerRef = useRef(null);
  const { height } = useDimensions(containerRef);

  console.log(height);

  return (
    <Wrapper>
      <Nav
        initial="closed"
        animate={isOpen ? 'open' : 'closed'}
        custom={height !== 0 ? height : 1000}
        variants={nav}
        isFloat={isFloat}
        ref={containerRef}
      >
        {children}
      </Nav>
    </Wrapper>
  );
};
