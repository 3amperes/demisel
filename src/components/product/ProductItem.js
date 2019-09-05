import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Image from 'gatsby-image';
import { Link } from 'gatsby';
import { Text, Flex } from 'rebass';
import { hasPrice, getPrice, getProductTitle } from '@utils';
import { colors } from '@theme';
import Figure from './Figure';

const Price = styled(Text)`
  text-decoration: ${props => (props.isDiscount ? 'line-through' : 'none')};
  color: ${props => (props.isDiscount ? colors.warmGrey : colors.lipstick)};
  font-weight: ${props => (props.isDiscount ? 400 : 600)};
`;

const ProductItem = ({ item }) => {
  return (
    <article>
      <Link to={`/product/${item.id}`}>
        {item.thumbnail ? (
          <Figure>
            <Image
              style={{
                width: '100%',
                height: '100%',
              }}
              fluid={item.thumbnail.asset.fluid}
            />
          </Figure>
        ) : (
          item.title
        )}
      </Link>
      <Text fontFamily="orpheuspro">{getProductTitle(item)}</Text>
      <Flex>
        {hasPrice(item, 'salePrice') && (
          <Price isDiscount={!!getPrice(item, 'discountPrice')}>
            {getPrice(item, 'salePrice')} €
          </Price>
        )}
        {!!getPrice(item, 'discountPrice') && (
          <Price ml="1rem">{getPrice(item, 'discountPrice')} €</Price>
        )}
      </Flex>
    </article>
  );
};

ProductItem.propTypes = {
  items: PropTypes.array,
};

export default ProductItem;
