import React, { createContext, useReducer, useState, useEffect } from 'react';
import { silentAuth } from '../utils/auth';
import { ThemeProvider } from 'styled-components';

import theme from '../theme';
import { GlobalStyles } from './globalStyles';
import { areEmptyFilters } from '@utils/helpers';

export const GlobalContext = createContext(0);
const initialState = {
  items: [],
  allItems: [],
  filters: new Map(),
  visible: 6,
  error: false,
};

function reducer(state, action) {
  console.log(`*** dispatched ${action.type} ***`, action.payload);
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
    case 'init_items':
      return {
        ...state,
        allItems: [...action.payload],
        items: [...action.payload],
      };
    case 'loadmore':
      return {
        ...state,
        visible: state.visible + 2,
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
    default:
      throw new Error();
  }
}

export default ({ children }) => {
  const [init, setInit] = useState(false);
  const [state, dispatch] = useReducer(reducer, initialState);

  // on mount
  useEffect(() => {
    silentAuth(() => setInit(true));
  }, []);

  return (
    <>
      {init && (
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
      )}
      <GlobalStyles />
    </>
  );
};
