import React, { useContext } from 'react';
import styled from 'styled-components';
import { Text, Flex } from 'rebass/styled-components';
import { hasPrice, getPrice } from '@utils';
import { colors } from '@theme';
import { GlobalContext } from '@components/globalStore';

const Price = styled(Text)`
  text-decoration: ${props => (props.isDiscount ? 'line-through' : 'none')};
  color: ${props => (props.isDiscount ? colors.warmGrey : colors.lipstick)};
  font-weight: ${props => (props.isDiscount ? 400 : 600)};
`;

export default ({ item }) => {
  const {
    state: { discountsAreEnabled },
  } = useContext(GlobalContext);
  const discountPrice = discountsAreEnabled && getPrice(item, 'discountPrice');
  return (
    <Flex>
      {hasPrice(item, 'salePrice') && (
        <Price isDiscount={discountPrice}>
          {getPrice(item, 'salePrice')} €
        </Price>
      )}
      {discountPrice && <Price ml="1rem">{discountPrice} €</Price>}
    </Flex>
  );
};
