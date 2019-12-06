import React, { useContext } from 'react';
import styled from 'styled-components';
import { up } from 'styled-breakpoints';
import { motion } from 'framer-motion';
import { hasPrice, getPrice } from '@utils';
import { colors } from '@theme';
import { shade } from 'polished';
import { BasketIcon } from '@components/header';
import { GlobalContext } from '@components/globalStore';

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 64px;
  height: 64px;
  border-radius: 50%;
  color: ${colors.white};
  background-color: ${colors.lipstick};
  outline: 0;
  border: none;
  cursor: pointer;
  font-weight: 600;
  font-size: 14px;
  transition: all 250ms ease-in-out;

  span {
    display: none;
  }

  ${up('tablet')} {
    width: 228px;
    border-radius: 0;
    span {
      display: inline;
    }
  }

  &:hover {
    background-color: ${shade(0.1, colors.lipstick)};
  }

  :disabled {
    background-color: ${colors.greyishBrown};
    cursor: not-allowed;
  }
`;

const AddButton = ({ product }) => {
  const {
    state: { discountsAreEnabled },
  } = useContext(GlobalContext);
  const isDisabled = !hasPrice(product);
  const name = product.model ? product.model.title : product.title;
  const description = product.model ? product.title : product.category.title;
  const price =
    (discountsAreEnabled && getPrice(product, 'discountPrice')) ||
    getPrice(product, 'salePrice');

  const addItem = async () => {
    if (typeof window !== undefined && window.Snipcart !== undefined) {
      try {
        await window.Snipcart.api.cart.items.add({
          id: product.id,
          name,
          price,
          url: `${process.env.GATSBY_SITE_DOMAIN_URL}/product/${product.id}`,
          description,
          image: product.thumbnail.asset.fluid.src,
          quantity: 1,
          hasTaxesIncluded: true,
        });
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <motion.div
      animate={{ x: 0 }}
      whileTap={{ scale: 0.94 }}
      whileHover={{ scale: 1.02, x: 10 }}
    >
      <Button disabled={isDisabled} onClick={addItem}>
        <span>Ajouter au panier</span> <BasketIcon ml={[0, '1rem']} />
      </Button>
    </motion.div>
  );
};

export default AddButton;
