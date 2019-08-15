import React from 'react';
import { graphql } from 'gatsby';
import MainLayout from '../main';
import { ProductList } from '../../components/product';
import { Pagination } from '../../components/pagination';
import SEO from '../../components/seo';

const Shop = ({ data, pageContext }) => {
  const products = data.allSanityProduct.edges;
  const { currentPage, numPages } = pageContext;
  console.info({ data, pageContext });
  return (
    <MainLayout>
      <SEO title="Shop" />
      <ProductList items={products} />
      <Pagination currentPage={currentPage} numPages={numPages} />
    </MainLayout>
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
