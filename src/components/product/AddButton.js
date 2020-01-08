import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { StaticQuery, graphql } from 'gatsby';
import { Box } from 'rebass/styled-components';
import { shade } from 'polished';
import { hasPrice, getPrice } from '@utils';
import { colors } from '@theme';
import { BasketIcon } from '@components/header';
import { useBreakpoint } from '@utils/hooks';

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${props => (props.isRounded ? '64px' : '228px')};
  height: 64px;
  border-radius: ${props => (props.isRounded ? '50%' : 0)};
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

const AddButton = ({ product, rounded }) => {
  const isDesktop = useBreakpoint('desktop');
  const isDisabled = !hasPrice(product);
  const productName = `${product.category.shortName} ${product.model &&
    product.model.title} ${product.title}`;

  const isRounded = !isDesktop || rounded;

  return (
    <StaticQuery
      query={graphql`
        query {
          config: allSanityConfig {
            edges {
              node {
                areDiscountsEnabled
              }
            }
          }
        }
      `}
      render={data => {
        const areDiscountsEnabled =
          data.config.edges[0].node.areDiscountsEnabled;
        const price =
          (areDiscountsEnabled && getPrice(product, 'discountPrice')) ||
          getPrice(product, 'salePrice');
        return (
          <motion.div
            animate={{ x: 0 }}
            whileTap={{ scale: 0.94 }}
            whileHover={{ scale: 1.02, x: 10 }}
          >
            <Button
              disabled={isDisabled}
              className="snipcart-add-item"
              data-item-id={product.id}
              data-item-price={price}
              data-item-url={`https://demiselbijoux.com/product/${product.id}`}
              data-item-description={product.category.title}
              data-item-image={product.thumbnail.asset.fluid.src}
              data-item-name={productName}
              data-item-has-taxes-included={true}
              isRounded={isRounded}
            >
              {!isRounded && (
                <Box as="span" mr="1rem">
                  Ajouter au panier
                </Box>
              )}
              <BasketIcon />
            </Button>
          </motion.div>
        );
      }}
    />
  );
};

export default AddButton;
