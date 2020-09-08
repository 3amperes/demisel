import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import Helmet from 'react-helmet';
import { getPrice } from '@utils';
import { Box } from 'rebass/styled-components';

export default () => (
  <StaticQuery
    query={graphql`
      query {
        products: allSanityProduct {
          edges {
            node {
              id
              title
              thumbnail {
                asset {
                  fluid(maxWidth: 500, maxHeight: 500) {
                    ...GatsbySanityImageFluid
                  }
                }
              }
              price {
                salePrice
                dealerPrice
                discountPrice
                weight
              }
              model {
                id
                title
                price {
                  salePrice
                  dealerPrice
                  discountPrice
                  weight
                }
              }
              category {
                id
                shortName
              }
            }
          }
        }
      }
    `}
    render={data => {
      const products = data.products.edges;

      return (
        <div>
          <Helmet title="fetch tool">
            <meta name="robots" content="noindex, nofollow" />
          </Helmet>

          <ul>
            {products &&
              products.map(({ node: product }) => {
                const productName = `${
                  product?.category?.shortName
                } ${product?.model?.title} ${product?.title}`;
                const price = getPrice(product, 'salePrice');
                return (
                  <Box as="li" key={product.id} mb="1rem">
                    <button
                      data-item-id={product.id}
                      data-item-price={price}
                      data-item-url={`https://demiselbijoux.com/product/${product.id}`}
                      data-item-description={product.category?.title}
                      data-item-image={product.thumbnail?.asset?.fluid.src}
                      data-item-name={productName}
                      data-item-has-taxes-included={true}
                    >
                      {productName}
                    </button>
                  </Box>
                );
              })}
          </ul>
        </div>
      );
    }}
  />
);
