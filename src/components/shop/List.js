import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import { Box } from 'rebass';
import { ProductItem } from '@components/product';
import { GlobalContext } from '@components/globalStore';

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-column-gap: 46px;
  grid-row-gap: 46px;
  max-width: 1076px;
  margin: 0 auto;
`;

const ShopList = ({ items }) => {
  const { state, dispatch } = useContext(GlobalContext);
  const loadMore = () => dispatch({ type: 'loadmore' });

  useEffect(() => {
    const currentIds = state.items.map(item => item.id);
    const itemsToAdd = items.filter(item => {
      return !currentIds.includes(item.id);
    });
    if (itemsToAdd.length > 0) {
      dispatch({ type: 'add_items', payload: items });
    }
  }, [items]);

  return (
    <>
      <Wrapper>
        {state.items.slice(0, state.visible).map(({ node: product }) => {
          return <ProductItem key={product.id} item={product} />;
        })}
      </Wrapper>
      {state.visible < state.items.length && (
        <Box my={5} textAlign="center">
          <button onClick={loadMore} type="button" className="load-more">
            Load more
          </button>
        </Box>
      )}
    </>
  );
};

export default ShopList;
