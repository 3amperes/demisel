import React, { createContext, useReducer } from 'react';
import { ThemeProvider } from 'styled-components';
import theme from '../theme';
import { GlobalStyles } from './globalStyles';
import { areEmptyFilters } from '@utils/helpers';

export const GlobalContext = createContext(0);
const initialState = {
  items: null,
  allItems: [],
  filters: new Map(),
  visible: 18,
  error: false,
  hasBanner: false,
  currentCategory: null,
  lockedScroll: false,
  discountsAreEnabled: false,
};

function reducer(state, action) {
  // console.log(`*** dispatched ${action.type} ***`, action.payload);
  const getFilteredItems = filters => {
    if (filters.size === 0) return [];
    const arrayFilter = Array.from(filters);

    return state.allItems.filter(({ node: item }) => {
      const result = arrayFilter.map(a => {
        const [key, collection] = a;
        if (collection.size === 0) return true;
        switch (key) {
          case 'model':
          default:
            return item[key] && item[key].id && collection.has(item[key].id);
          case 'collections':
          case 'colors':
            return item[key] && item[key].some(({ id }) => collection.has(id));
          case 'discount':
            return (
              (item.price && item.price.discountPrice) ||
              (item.model && item.model.price && item.model.discountPrice)
            );
        }
      });
      return result.every(a => a);
    });
  };
  switch (action.type) {
    case 'toggle_scroll_lock':
      return {
        ...state,
        lockedScroll: action.payload,
      };
    case 'discounts_are_enabled':
      return {
        ...state,
        discountsAreEnabled: true,
      };
    case 'init_items':
      return {
        ...state,
        allItems: [...action.payload],
        items: [...action.payload],
      };
    case 'loadmore':
      return {
        ...state,
        visible: state.visible + 9,
      };
    case 'init_filters':
      return {
        ...state,
        filters: new Map(action.payload),
        items: getFilteredItems(action.payload),
      };
    case 'update_filters': // {key, value}
      const filters = new Map(state.filters);
      const { key, value } = action.payload;
      const keyFilters = filters.get(key) || new Set();
      if (keyFilters.has(value)) {
        keyFilters.delete(value);
      } else {
        keyFilters.add(value);
      }
      filters.set(key, keyFilters);
      if (keyFilters.size === 0) {
        filters.delete(key);
      }
      return {
        ...state,
        filters,
        items: !areEmptyFilters(filters)
          ? getFilteredItems(filters)
          : state.allItems,
      };
    case 'clear_filters':
      return {
        ...state,
        filters: new Map(),
        items: state.allItems,
      };
    case 'update_banner':
      return {
        ...state,
        hasBanner: action.payload,
      };
    case 'update_current_category':
      return {
        ...state,
        currentCategory: action.payload,
      };
    default:
      throw new Error();
  }
}

export default ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalContext.Provider
          value={{
            state,
            dispatch,
            areEmptyFilters,
          }}
        >
          {children}
        </GlobalContext.Provider>
      </ThemeProvider>
      <GlobalStyles />
    </>
  );
};
