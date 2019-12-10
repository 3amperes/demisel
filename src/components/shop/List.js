import React, {
  useContext,
  useEffect,
  useRef,
  useState,
  useCallback,
} from 'react';
import throttle from 'lodash.throttle';
import styled from 'styled-components';
import { up } from 'styled-breakpoints';
import { motion } from 'framer-motion';
import { Box } from 'rebass/styled-components';
import { ProductItem } from '@components/product';
import { GlobalContext } from '@components/globalStore';
import { colors } from '@theme';
import { container, link } from '@utils/mixins';
import { scrollToTop } from '@utils/helpers';
import withLocation from '@utils/withLocation';
import { FilerIcon } from './Filters';

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

const BackToFilterButton = styled.button`
  outline: none;
  border: none;
  background: ${colors.greyishBrown};
  color: ${colors.white};
  border-radius: 50%;
  padding: 16px;
  position: fixed;
  right: 1rem;
  bottom: 1rem;
  cursor: pointer;
  transition: all 250ms ease-in-out;

  &:hover,
  &:focus {
    background: ${colors.lipstick};
    color: ${colors.white};
  }

  opacity: ${props => (props.isDisplay ? 1 : 0)};
`;

const BackToFilter = props => {
  return (
    <BackToFilterButton {...props}>
      <FilerIcon />
    </BackToFilterButton>
  );
};

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

const ShopList = ({ search, onOpenFilters }) => {
  const { state, dispatch } = useContext(GlobalContext);
  const [backToFilterIsDisplay, setBackToFilterIsDisplay] = useState(false);
  const loadMore = () => dispatch({ type: 'loadmore' });
  const hasMore = () => state.visible < state.items.length;

  const initialSearch = useRef(search);

  useEffect(() => {
    if (search.refresh) {
      const { refresh, ...params } = search;
      initialSearch.current = params;
    }
  }, [search.refresh]);

  // overwrite filters from query params
  useEffect(() => {
    const filtersFromSearch = getFiltersFromQueryParams(initialSearch.current);
    if (filtersFromSearch.size === 0) return;
    dispatch({
      type: 'init_filters',
      payload: filtersFromSearch,
    });
  }, [initialSearch, dispatch, search.refresh]);

  useEffect(() => {
    if (document === 'undefined') return;
    const onScroll = () => {
      if (
        document.documentElement.scrollTop >
          document.documentElement.clientHeight / 2 &&
        !backToFilterIsDisplay
      ) {
        setBackToFilterIsDisplay(true);
      }
      if (
        document.documentElement.scrollTop <
          document.documentElement.clientHeight / 2 &&
        backToFilterIsDisplay
      ) {
        setBackToFilterIsDisplay(false);
      }
    };

    // Add event listener
    document.addEventListener('scroll', throttle(onScroll, 200));
    // Remove event listener on cleanup
    return () => {
      document.removeEventListener('scroll', throttle(onScroll, 200));
    };
  }, [backToFilterIsDisplay]);

  const handleBackToFilterClick = e => {
    e.preventDefault();
    onOpenFilters();
    scrollToTop();
  };

  return !state.items ? null : (
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

      <BackToFilter
        onClick={handleBackToFilterClick}
        isDisplay={backToFilterIsDisplay}
      />
    </>
  );
};

export default withLocation(ShopList);
