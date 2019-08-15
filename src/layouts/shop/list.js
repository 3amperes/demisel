import React, { useContext, useEffect } from 'react';
import { graphql } from 'gatsby';
import MainLayout from '../main';
import { ProductList } from '../../components/product';
import { Pagination } from '../../components/pagination';
import SEO from '../../components/seo';
import { GlobalContext } from '../../components/globalStore';

const Shop = ({ data, pageContext }) => {
  const { state, dispatch, loadMore, toggle, isInitializing } = useContext(
    GlobalContext
  );
  const allProducts = data.allSanityProduct.edges;
  const { currentPage, numPages } = pageContext;
  const pageProductsIds = Object.values(state.pages).flat();
  const contextProducts = pageContext.pageProducts.map(p => p.node.id);

  const filteredProducts = allProducts.filter(product =>
    state.useInfiniteScroll
      ? pageProductsIds.includes(product.node.id)
      : contextProducts.includes(product.node.id)
  );

  useEffect(() => {
    if (isInitializing() || !state.useInfiniteScroll) {
      const pageKey = 'page' + pageContext.currentPage;
      console.log(`View is initializing items according to ${pageKey}.`);
      dispatch({
        type: 'add_page',
        payload: {
          cursor: pageContext.currentPage + 1,
          [pageKey]: contextProducts,
        },
      });
    }
  }, []);
  return (
    <MainLayout>
      <SEO title="Shop" />
      <ProductList items={filteredProducts} />
      <button onClick={toggle}>toggle infite scroll</button>
      {state.useInfiniteScroll ? (
        <button onClick={loadMore}>loadmore</button>
      ) : (
        <Pagination currentPage={currentPage} numPages={numPages} />
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
