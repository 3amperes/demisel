import React from 'react';
import { graphql } from 'gatsby';
import { ProductList } from '../components/product';
import Pagination from '../components/pagination';

const Shop = ({ data, pageContext }) => {
  const products = data.allSanityProduct.edges;
  const { currentPage, numPages } = pageContext;
  console.info({ pageContext });
  return (
    <div>
      <ProductList items={products} />
      <Pagination currentPage={currentPage} numPages={numPages} />
    </div>
  );
};

export default Shop;

export const query = graphql`
  query ShopListQuery($skip: Int!, $limit: Int!) {
    allSanityProduct(
      sort: { fields: _updatedAt, order: DESC }
      limit: $limit
      skip: $skip
    ) {
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
