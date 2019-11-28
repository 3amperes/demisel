import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import { up } from 'styled-breakpoints';
import { motion } from 'framer-motion';
import { Box } from 'rebass/styled-components';
import isEqual from 'lodash.isequal';
import { ProductItem } from '@components/product';
import { GlobalContext } from '@components/globalStore';
import { colors } from '@theme';
import { container, link } from '@utils/mixins';
import withLocation from '@utils/withLocation';

const Wrapper = styled.ul`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 46px;
  ${container}

  ${up('tablet')} {
    grid-template-columns: repeat(2, 1fr);
  }
  ${up('desktop')} {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const Empty = styled.div`
  ${container};
`;

const LoadMoreButton = styled.button`
  outline: none;
  border: none;
  background: none;
  padding: 0;

  ${link(colors.lipstick)}
`;

const getFiltersFromQueryParams = params => {
  const filters =
    Object.keys(params).length === 0
      ? new Map()
      : new Map(Object.entries(params));
  filters.forEach((value, key, map) => {
    const v = typeof value !== 'object' ? [value] : value;
    filters.set(key, new Set(v));
  });
  return filters;
};

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
  useEffect(() => {
    const filtersFromSearch = getFiltersFromQueryParams(search);
    const isCalm = isEqual(state.filters, filtersFromSearch);
    if (isCalm || filtersFromSearch.size === 0) return;
    dispatch({ type: 'init_filters', payload: filtersFromSearch });
  }, [search]);

  return (
    <>
      {state.items.length > 0 ? (
        <Wrapper>
          {state.items.slice(0, state.visible).map(({ node: product }) => {
            return (
              <motion.li positionTransition key={product.id}>
                <ProductItem item={product} />
              </motion.li>
            );
          })}
        </Wrapper>
      ) : (
        <Empty>pas de résultats</Empty>
      )}
      {hasMore() && (
        <Box my={5} textAlign="center">
          <LoadMoreButton
            onClick={loadMore}
            type="button"
            className="load-more"
          >
            Voir plus ({state.visible} / {state.items.length})
          </LoadMoreButton>
        </Box>
      )}
    </>
  );
};

export default withLocation(ShopList);
