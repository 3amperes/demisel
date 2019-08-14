import React from 'react';
import PropTypes from 'prop-types';
import Image from 'gatsby-image';
import { Link } from 'gatsby';
import { hasPrice, getPrice, getProductTitle } from '../../utils';

const ProductItem = ({ item }) => {
  return (
    <Link to={`/product/${item.id}`}>
      <article>
        {item.thumbnail && <Image fluid={item.thumbnail.asset.fluid} />}
        {hasPrice(item, 'salePrice') && <p>{getPrice(item, 'salePrice')} €</p>}
        <h2>{getProductTitle(item)}</h2>
      </article>
    </Link>
  );
};

ProductItem.propTypes = {
  items: PropTypes.array,
};

export default ProductItem;
