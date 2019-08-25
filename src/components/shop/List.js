import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import { Box } from 'rebass';
import isEqual from 'lodash.isequal';
import { ProductItem } from '@components/product';
import { GlobalContext } from '@components/globalStore';
import { container } from '@utils/mixins';
import withLocation from '@utils/withLocation';

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-column-gap: 46px;
  grid-row-gap: 46px;
  ${container}
`;

const Empty = styled.div`
  ${container}
`;

const ShopList = ({ items, search }) => {
  const { state, dispatch } = useContext(GlobalContext);
  const loadMore = () => dispatch({ type: 'loadmore' });
  const hasMore = () => state.visible < state.items.length;

  // overwrite items
  useEffect(() => {
    if (isEqual(state.items, items)) return;
    dispatch({ type: 'init_items', payload: items });
  }, [items]);

  // overwrite filters from query params
  // useEffect(() => {
  //   const filters =
  //     Object.keys(search).length === 0
  //       ? new Map()
  //       : new Map(Object.entries(search));
  //   filters.forEach((value, key, map) => {
  //     const v = typeof value === 'string' ? [value] : value;
  //     filters.set(key, new Set(v));
  //   });
  //   const isCalm = isEqual(state.filters, filters);
  //   console.log('filters are', filters);
  //   console.log('state filters are', state.filters);
  //   console.log(isCalm);
  //   if (isCalm) return;
  //   dispatch({ type: 'init_filters', payload: filters });
  // }, [search]);

  // useEffect(() => {
  //   dispatch({ type: 'udpate_filteredItems' });
  // }, [state.filters]);

  return (
    <>
      {state.items.length > 0 ? (
        <Wrapper>
          {state.items.slice(0, state.visible).map(({ node: product }) => {
            return <ProductItem key={product.id} item={product} />;
          })}
        </Wrapper>
      ) : (
        <Empty>pas de résultats</Empty>
      )}
      {hasMore() && (
        <Box my={5} textAlign="center">
          <button onClick={loadMore} type="button" className="load-more">
            Load more
          </button>
        </Box>
      )}
    </>
  );
};

export default withLocation(ShopList);
