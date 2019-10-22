import React, { useState } from 'react';
import styled from 'styled-components';
import { Box } from 'rebass/styled-components';
import Item from './Item';

const Wrapper = styled(Box)`
  width: 100%;
  min-height: 400px;
  position: relative;
  transition: all 250ms ease-in-out;
`;
export default ({ slides }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  return (
    slides.length > 0 && (
      <div>
        <Wrapper>
          {slides.map((slide, index) => {
            console.log(currentIndex, index);
            return (
              <Item
                key={slide.id}
                slide={slide}
                isCurrent={currentIndex == index}
              />
            );
          })}
        </Wrapper>
        <button onClick={() => setCurrentIndex(currentIndex === 0 ? 1 : 0)}>
          next
        </button>
      </div>
    )
  );
};
