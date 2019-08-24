import React, { createContext, useReducer, useState, useEffect } from 'react';
import { silentAuth } from '../utils/auth';
import { ThemeProvider } from 'styled-components';

import theme from '../theme';
import { GlobalStyles } from './globalStyles';

export const GlobalContext = createContext(0);
const initialState = {
  items: [],
  visible: 2,
  error: false,
};

function reducer(state, action) {
  console.log(`*** dispatched ${action.type} ***`, action.payload);
  const { cursor, ...page } = action.payload ? action.payload : {};
  switch (action.type) {
    case 'add_items':
      return {
        ...state,
        items: [...state.items, ...action.payload],
      };
    case 'loadmore':
      return {
        ...state,
        visible: state.visible + 2,
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

  const hasMore = pageContext => {};

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
