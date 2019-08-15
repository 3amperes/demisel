import React, { createContext, useReducer, useState, useEffect } from 'react';
import { silentAuth } from '../utils/auth';
/*
 * The reason we use Global State instead of Component State is that
 * when the user clicks something on the main page and then clicks back,
 * we don't want to reset the user's scroll position. If we don't maintain
 * state, then we will "lose" some of the items when the user clicks
 * back and the state resets, which obviously resets scroll position as well.
 */
export const GlobalContext = createContext();
const initialState = {
  cursor: 0 /* Which page infinite scroll should fetch next. */,
  useInfiniteScroll: true /* Toggle between pagination and inf. scroll & fallback in case of error. */,
  pages: {},
};

function reducer(state, action) {
  console.log(`*** dispatch ${action.type} ***`);
  switch (action.type) {
    case 'activate_infinite_scroll':
      return { ...state, useInfiniteScroll: true };
    case 'desactivate_infinite_scroll':
      return { ...state, useInfiniteScroll: false };
    case 'add_page':
      const { cursor, ...page } = action.payload;
      return {
        ...state,
        cursor,
        pages: { ...state.pages, ...page },
      };
    default:
      throw new Error();
  }
}

export const GlobalProvider = ({ children }) => {
  const { Provider } = GlobalContext;
  const [init, setInit] = useState(false);
  const [state, dispatch] = useReducer(reducer, initialState);

  // on mount
  useEffect(() => {
    silentAuth(() => setInit(true));
  }, []);

  const isInitializing = () => {
    return state.cursor === 0;
  };

  const loadMore = () => {
    console.log('Fetching metadata for page ' + state.cursor);
    const pageNum = state.cursor;
    // set state.cursor + 1;
    // TODO: make sure this is guaranteed to set state before another loadMore may be able to fire!
    fetch(`./paginationJson/indexshop${pageNum}.json`)
      .then(res => res.json())
      .then(
        res => {
          dispatch({
            type: 'add_page',
            payload: {
              cursor: state.cursor + 1,
              ['page' + pageNum]: res.map(r => r.node.id),
            },
          });
        },
        error => {
          dispatch({
            type: 'desactivate_infinite_scroll',
          });
        }
      );
  };

  const hasMore = pageContext => {
    if (!state.useInfiniteScroll) return false;
    if (isInitializing()) return true;
    return state.cursor <= pageContext.countPages;
  };

  const toggle = () => {
    const type = state.useInfiniteScroll
      ? 'desactivate_infinite_scroll'
      : 'activate_infinite_scroll';
    dispatch({
      type,
    });
  };

  return (
    init && (
      <Provider
        value={{ state, dispatch, isInitializing, loadMore, hasMore, toggle }}
      >
        {children}
      </Provider>
    )
  );
};
