import React from "react";
import PropTypes from "prop-types";
import Image from "gatsby-image";

const AddBtn = ({ product }) => {
  return (
    <button
      className="snipcart-add-item"
      data-item-id={product._id}
      data-item-name={product.title}
      data-item-price={product.price.unitPrice}
      data-item-price-pro={product.price.proPrice}
      data-item-price-alt={product.price.altPrice}
      data-item-url="https://demiselbijoux.netlify.com"
      data-item-description={product.title}
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
      <p>{item.price.unitPrice} €</p>
      <AddBtn product={item} />
    </article>
  );
};

ProductItem.propTypes = {
  items: PropTypes.array,
};

export default ProductItem;
