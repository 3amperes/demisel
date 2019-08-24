import React from 'react';
import styled from 'styled-components';
import { ProductItem } from '@components/product';

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-column-gap: 46px;
  grid-row-gap: 46px;
  max-width: 1076px;
  margin: 0 auto;
`;

const ShopList = ({ items }) => (
  <Wrapper>
    {items.map(({ node: product }) => {
      return <ProductItem key={product.id} item={product} />;
    })}
  </Wrapper>
);

export default ShopList;
