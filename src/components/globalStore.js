import React, { createContext, useReducer, useState, useEffect } from 'react';
import { silentAuth } from '../utils/auth';
import { ThemeProvider } from 'styled-components';

import theme from '../theme';
import { GlobalStyles } from './globalStyles';

export const GlobalContext = createContext(0);
const initialState = {
  items: [],
  filters: new Map(),
  visible: 2,
  error: false,
};

function reducer(state, action) {
  console.log(`*** dispatched ${action.type} ***`, action.payload);
  switch (action.type) {
    case 'init_items':
      return {
        ...state,
        items: [...action.payload],
      };
    case 'loadmore':
      return {
        ...state,
        visible: state.visible + 2,
      };
    case 'update_filters':
      const filters = new Map(state.filters);
      const { key, value } = action.payload;
      const keyFilters = filters.get(key) || new Set();
      if (keyFilters.has(value)) {
        keyFilters.delete(value);
      } else {
        keyFilters.add(value);
      }
      filters.set(key, keyFilters);
      return {
        ...state,
        filters,
      };
    case 'clear_filters':
      return {
        ...state,
        filters: new Map(),
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
