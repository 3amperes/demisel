import React, { useState } from 'react';
import styled from 'styled-components';
import { Box, Flex } from 'rebass/styled-components';
import { colors } from '@theme';
import Item from './Item';

const Wrapper = styled(Box)`
  width: 100%;
  min-height: 400px;
  position: relative;
  transition: all 250ms ease-in-out;
`;

const Pagination = styled(Flex)`
  position: absolute;
  left: 0;
  bottom: 0;
`;

const PaginationButton = styled.button`
  outline: 0;
  border: none;
  background: transparent;
  color: ${colors.white};
  opacity: ${props => (props.isCurrent ? 1 : 0.6)};
  padding: 0.5rem;
  font-size: 14px;
  cursor: pointer;
`;

export default ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  return (
    items.length > 0 && (
      <Wrapper>
        {items.map((item, index) => {
          return (
            <Item
              key={item._key}
              item={item}
              isCurrent={currentIndex === index}
            />
          );
        })}
        <Pagination>
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
        </Pagination>
      </Wrapper>
    )
  );
};
