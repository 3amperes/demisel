import React, { useContext, useEffect, useState } from 'react';
import { graphql } from 'gatsby';
import MainLayout from '../main';
import { ProductItem } from '@components/product';
import { Pagination } from '@components/pagination';
import SEO from '@components/seo';
import { GlobalContext } from '@components/globalStore';
import InfiniteScroll from '@components/InfiniteScroll';

const Shop = ({ data, pageContext }) => {
  const {
    state,
    dispatch,
    hasMore,
    loadMore,
    toggle,
    isInitializing,
  } = useContext(GlobalContext);
  const allProducts = data.allSanityProduct.edges;
  const { currentPage, countPages } = pageContext;
  const pageProductsIds = Object.values(state.pages).flat();
  const contextProducts = pageContext.pageProducts.map(p => p.node.id);
  const paginationData = {
    currentPage,
    countPages,
    useInfiniteScroll: state.useInfiniteScroll,
  };

  const filteredProducts = allProducts.filter(product =>
    state.useInfiniteScroll
      ? pageProductsIds.includes(product.node.id)
      : contextProducts.includes(product.node.id)
  );

  const init = () => {
    if (isInitializing() || !state.useInfiniteScroll) {
      const pageKey = 'page' + pageContext.currentPage;
      console.log(`View is initializing items according to ${pageKey}.`);
      dispatch({
        type: 'init_page',
        payload: {
          cursor: pageContext.currentPage + 1,
          [pageKey]: contextProducts,
        },
      });
    }
  };

  const onToggle = () => {
    toggle();
    init();
  };

  useEffect(() => {
    console.log({ pageContext });
    init();
  }, [pageContext]);

  return (
    <MainLayout>
      <SEO title="Shop" />
      <button onClick={onToggle}>toggle infite scroll</button>
      <div>
        {/* Infinite Scroll */}
        <InfiniteScroll
          throttle={150}
          threshold={100}
          hasMore={hasMore(pageContext)}
          onLoadMore={loadMore}
        >
          {filteredProducts.map(({ node: product }) => {
            return <ProductItem key={product.id} item={product} />;
          })}
        </InfiniteScroll>
      </div>

      {/* Loading spinner. */}
      {(state.cursor === 0 || hasMore(pageContext)) && (
        <div className="spinner">loading...</div>
      )}
      {/* Fallback to Pagination for non JS users. */}
      {state.useInfiniteScroll && (
        <noscript>
          <style>{`.spinner { display: none !important; }`}</style>
          <Pagination paginationData={paginationData} pathPrefix="/shop" />
          <h4>
            <center>Infinite Scroll does not work without JavaScript.</center>
          </h4>
        </noscript>
      )}

      {/* Fallback to Pagination on toggle (for demo) and also on error. */}
      {!state.useInfiniteScroll && (
        <Pagination paginationData={paginationData} pathPrefix="/shop" />
      )}
    </MainLayout>
  );
};

export default Shop;

export const query = graphql`
  query ShopListQuery {
    allSanityProduct {
      edges {
        node {
          id
          title
          thumbnail {
            asset {
              fluid(maxWidth: 700) {
                ...GatsbySanityImageFluid
              }
            }
            alt
          }
          price {
            salePrice
            dealerPrice
            promoPrice
            weight
          }
          model {
            id
            title
            price {
              salePrice
              dealerPrice
              promoPrice
              weight
            }
          }
        }
      }
    }
  }
`;
