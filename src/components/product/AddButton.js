import React from 'react';
import styled from 'styled-components';
import { hasPrice, getPrice } from '@utils';
import { colors } from '@theme';
import { shade } from 'polished';

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 228px;
  height: 64px;
  color: ${colors.white};
  background-color: ${colors.lipstick};
  outline: 0;
  border: none;
  cursor: pointer;
  font-weight: 600;
  font-size: 14px;
  transition: all 250ms ease-in-out;

  &:hover {
    background-color: ${shade(0.1, colors.lipstick)};
  }

  :disabled {
    background-color: ${colors.greyishBrown};
    cursor: not-allowed;
  }
`;

const AddButton = ({ product }) => {
  const isDisabled = !hasPrice(product);
  const title = product.model ? product.model.title : product.title;
  const description = product.model ? product.title : product.category.title;
  return (
    <Button
      disabled={isDisabled}
      className="snipcart-add-item"
      data-item-id={product.id}
      data-item-name={title}
      data-item-price={getPrice(product, 'salePrice')}
      data-item-price-dealer={getPrice(product, 'dealerPrice')}
      data-item-price-promo={getPrice(product, 'discountPrice')}
      data-item-url="https://demiselbijoux.netlify.com"
      data-item-description={description}
    >
      Ajouter au panier
    </Button>
  );
};

export default AddButton;
