import React from "react";
import PropTypes from "prop-types";

const AddBtn = ({ product }) => {
  return (
    <button
      className="snipcart-add-item"
      data-item-id={product._id}
      data-item-name={product.title}
      data-item-price={product.unitPrice}
      data-item-price-pro={product.proPrice}
      data-item-url="https://demiselbijoux.netlify.com"
      data-item-description={product.description}
    >
      Ajouter au panier
    </button>
  );
};

const ProductItem = ({ item }) => {
  return (
    <article>
      <h2>{item.title}</h2>
      <Image fluid={item.thumbnail.image.asset.fluid} />
      <p>{item.unitPrice} €</p>
      <AddBtn product={item} />
    </article>
  );
};

ProductItem.propTypes = {
  items: PropTypes.array,
};

export default ProductItem;
