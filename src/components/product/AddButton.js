import React from "react";
import { hasPrice, getPrice } from "../../utils";

const AddButton = ({ product }) => {
  const isDisabled = !hasPrice(product);
  return (
    <button
      disabled={isDisabled}
      className="snipcart-add-item"
      data-item-id={product.id}
      data-item-name={product.title}
      data-item-price={getPrice(product, "salePrice")}
      data-item-price-dealer={getPrice(product, "dealerPrice")}
      data-item-price-promo={getPrice(product, "promoPrice")}
      data-item-url="https://demiselbijoux.netlify.com"
      data-item-description={product.title}
    >
      Ajouter au panier
    </button>
  );
};

export default AddButton;
