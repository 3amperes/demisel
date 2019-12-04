import React from 'react';
import PropTypes from 'prop-types';
import Image from 'gatsby-image';
import { Link } from 'gatsby';
import { Text } from 'rebass/styled-components';
import { getProductTitle } from '@utils';
import Figure from './Figure';
import Price from './Price';

const ProductItem = ({ item }) => {
  return (
    <article>
      <Link to={`/product/${item.id}`}>
        {item.thumbnail ? (
          <Figure>
            <Image
              style={{
                width: '80%',
                height: '80%',
              }}
              fluid={item.thumbnail.asset.fluid}
            />
          </Figure>
        ) : (
          item.title
        )}
      </Link>
      <Text mt="1rem" fontFamily="orpheuspro">
        {getProductTitle(item)}
      </Text>
      <Price item={item} />
    </article>
  );
};

ProductItem.propTypes = {
  items: PropTypes.array,
};

export default ProductItem;
