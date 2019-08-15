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
  const { cursor, useInfiniteScroll, pages } = state;
  const [productIds, setProductIds] = useState([]);
  const contextProducts = pageContext.pageProducts.map(p => p.node.id);
  const paginationData = {
    currentPage,
    countPages,
    useInfiniteScroll,
  };

  useEffect(() => {
    setProductIds(Object.values(pages).flat());
  }, [pages]);

  const filteredProducts = allProducts.filter(product => {
    const ids = useInfiniteScroll ? productIds : contextProducts;
    return ids.includes(product.node.id);
  });

  const init = () => {
    const pageKey = 'page' + pageContext.currentPage;
    console.log(`list is initializing items according to ${pageKey}.`);
    dispatch({
      type: 'add_page',
      payload: {
        cursor: pageContext.currentPage + 1,
        [pageKey]: contextProducts,
      },
    });
  };

  useEffect(() => {
    if (isInitializing() || !useInfiniteScroll) {
      init();
    }
  }, [pageContext]);

  return (
    <MainLayout>
      <SEO title="Shop" />
      <button onClick={toggle}>toggle infite scroll</button>
      {filteredProducts.length > 0 ? (
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
      ) : (
        <p>pas de produits</p>
      )}

      {/* Loading spinner. */}
      {(cursor === 0 || hasMore(pageContext)) && (
        <div className="spinner">loading...</div>
      )}
      {/* Fallback to Pagination for non JS users. */}
      {useInfiniteScroll && (
        <noscript>
          <style>{`.spinner { display: none !important; }`}</style>
          <Pagination paginationData={paginationData} pathPrefix="/shop" />
          <h4>
            <center>Infinite Scroll does not work without JavaScript.</center>
          </h4>
        </noscript>
      )}

      {/* Fallback to Pagination on toggle (for demo) and also on error. */}
      {!useInfiniteScroll && (
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
