import React from "react";
import PropTypes from "prop-types";

import ProductItem from "./ProductItem";

const ProductList = ({ items }) => {
  return (
    <ul style={{ listStyle: "none", display: "flex" }}>
      {items.map(({ node: product }, index) => {
        return (
          <li key={product.slug.current} style={{ maxWidth: "15rem" }}>
            <ProductItem item={product}></ProductItem>
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
