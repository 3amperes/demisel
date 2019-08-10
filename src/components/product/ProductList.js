import React from "react";
import PropTypes from "prop-types";

const ProductList = ({ items }) => {
  return (
    <div>
      {items.map(({ node: product }, index) => {
        return <li key={product.slug.current}>{product.title}</li>;
      })}
    </div>
  );
};

ProductList.propTypes = {
  items: PropTypes.array,
};

export default ProductList;
