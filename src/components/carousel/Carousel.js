import React, { useState, useEffect, useContext, useMemo } from 'react';
import styled from 'styled-components';
import { down } from 'styled-breakpoints';
import { Box, Flex } from 'rebass/styled-components';
import { colors } from '@theme';
import { GlobalContext } from '@components/globalStore';
import Go from '@components/go';
import Item from './Item';
import { useBreakpoint } from '@utils/hooks';
import { browser } from '@utils/helpers';

const Wrapper = styled(Box)`
  width: 100%;
  position: relative;
  transition: all 250ms ease-in-out;
  height: ${props => props.height};
`;

const Footer = styled(Flex)`
  position: absolute;
  left: 0;
  bottom: 0;
  padding: 1rem;
  width: 100%;
  z-index: 2;
  height: calc(46px + 2rem);
  align-items: center;
  ${down('tablet')} {
    padding-bottom: 3rem;
  }
`;

const PaginationButton = styled.button`
  outline: 0;
  border: none;
  background: transparent;
  color: ${colors.white};
  opacity: ${props => (props.isCurrent ? 1 : 0.6)};
  font-size: 14px;
  line-height: 1;
  cursor: pointer;
`;

export default ({ items }) => {
  const {
    state: { hasBanner },
  } = useContext(GlobalContext);
  const isDesktop = useBreakpoint('desktop');
  const [currentIndex, setCurrentIndex] = useState(0);

  const wrapperHeight = useMemo(() => {
    if (!browser()) return;
    const windowHeight = browser().innerHeight;
    switch (true) {
      case hasBanner && isDesktop:
        return `${windowHeight - 50}px`;
      case hasBanner && !isDesktop:
        return `${windowHeight - 80}px`;
      default:
        return `${windowHeight}px`;
    }
  }, [hasBanner, isDesktop]);

  useEffect(() => {
    const t = setTimeout(() => {
      currentIndex < items.length - 1
        ? setCurrentIndex(currentIndex + 1)
        : setCurrentIndex(0);
    }, 4000);
    return () => {
      clearTimeout(t);
    };
  }, [currentIndex, setCurrentIndex, items]);

  const scrollToIntro = () => {
    if (typeof document === undefined) return;
    const intro = document.getElementById('intro');
    if (intro !== undefined) {
      intro.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest',
      });
    }
  };

  return (
    items.length > 0 && (
      <Wrapper height={wrapperHeight}>
        {items.map((item, index) => {
          return (
            <Item
              key={item._key}
              item={item}
              isCurrent={currentIndex === index}
            />
          );
        })}
        <Footer>
          <Box mr="auto">
            {items.map((item, index) => {
              return (
                <PaginationButton
                  key={item._key}
                  isCurrent={currentIndex === index}
                  onClick={() => setCurrentIndex(index)}
                >
                  {index + 1}
                </PaginationButton>
              );
            })}
          </Box>
          <Go
            style={{
              transform: 'rotate(90deg)',
              cursor: 'pointer',
            }}
            onClick={scrollToIntro}
          />
        </Footer>
      </Wrapper>
    )
  );
};
