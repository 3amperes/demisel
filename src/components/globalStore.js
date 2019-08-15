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
  useInfiniteScroll: true /* Toggle between pagination and inf. scroll for this demo & fallback in case of error. */,
  isInitializing: () => {
    return true;
  },
  updateState: () => {},
  hasMore: () => {},
  loadMore: () => {},
  toggle: () => {},
};

function reducer(state, action) {
  console.log(`*** dispatch ${action.type} ***`);
  switch (action.type) {
    case 'activate_infinite_scroll':
      return { ...state, useInfiniteScroll: true };
    case 'desactivate_infinite_scroll':
      return { ...state, useInfiniteScroll: false };
    case 'loadmore':
      return { ...state, cursor: state.cursor + 1 };
    default:
      throw new Error();
  }
}

// class GlobalContextProvider extends React.Component {
//   constructor(props) {
//     super(props);

//     console.log('*** Constructing Global State ***');

//     this.toggle = this.toggle.bind(this);
//     this.loadMore = this.loadMore.bind(this);
//     this.hasMore = this.hasMore.bind(this);
//     this.updateState = this.updateState.bind(this);
//     this.isInitializing = this.isInitializing.bind(this);

//     /* State also contains metadata for items, e.g. state["page81"] (only contains keys for _received_ metadata) */
//     this.state = {
//       cursor: 0,
//       useInfiniteScroll: true,
//       isInitializing: this.isInitializing,
//       updateState: this.updateState,
//       hasMore: this.hasMore,
//       loadMore: this.loadMore,
//       toggle: this.toggle,
//       loading: true,
//     };
//   }

//   isInitializing = () => {
//     return this.state.cursor === 0;
//   };

//   updateState = mergeableStateObject => {
//     this.setState(mergeableStateObject);
//   };

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
    fetch(`${__PATH_PREFIX__}/paginationJson/index${pageNum}.json`)
      .then(res => res.json())
      .then(
        res => {
          dispatch({
            type: 'loadmore',
            payload: {
              ['page' + pageNum]: res,
            },
          });
        },
        error => {
          dispatch({
            type: 'desactivate_infinite_scroll',
          });
          this.setState({
            useInfiniteScroll: false, // Fallback to Pagination on error.
          });
        }
      );
  };

  const hasMore = pageContext => {
    if (!state.useInfiniteScroll) return false;
    if (isInitializing()) return true;
    return state.cursor <= pageContext.countPages;
  };

  return (
    init && (
      <Provider value={{ state, dispatch, isInitializing, loadMore, hasMore }}>
        {children}
      </Provider>
    )
  );
};
