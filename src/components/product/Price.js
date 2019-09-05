import React from 'react';
import styled from 'styled-components';
import { Text, Flex } from 'rebass/styled-components';
import { hasPrice, getPrice } from '@utils';
import { colors } from '@theme';

const Price = styled(Text)`
  text-decoration: ${props => (props.isDiscount ? 'line-through' : 'none')};
  color: ${props => (props.isDiscount ? colors.warmGrey : colors.lipstick)};
  font-weight: ${props => (props.isDiscount ? 400 : 600)};
`;

export default ({ item }) => {
  return (
    <Flex>
      {hasPrice(item, 'salePrice') && (
        <Price isDiscount={!!getPrice(item, 'discountPrice')}>
          {getPrice(item, 'salePrice')} €
        </Price>
      )}
      {!!getPrice(item, 'discountPrice') && (
        <Price ml="1rem">{getPrice(item, 'discountPrice')} €</Price>
      )}
    </Flex>
  );
};
