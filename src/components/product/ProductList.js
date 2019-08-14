import React from 'react';
import PropTypes from 'prop-types';

import ProductItem from './ProductItem';

const ProductList = ({ items }) => {
  return (
    <ul style={{ listStyle: 'none', display: 'flex' }}>
      {items.map(({ node: product }) => {
        return (
          <li
            key={product.id}
            style={{ maxWidth: '15rem', marginRight: '2rem' }}
          >
            <ProductItem item={product} />
          </li>
        );
      })}
    </ul>
  );
};

ProductList.propTypes = {
  items: PropTypes.array,
};

export default ProductList;
