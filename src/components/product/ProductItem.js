import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Image from 'gatsby-image';
import { Link } from 'gatsby';
import { Text } from 'rebass';
import { hasPrice, getPrice, getProductTitle } from '@utils';
import { colors } from '@theme';

const Figure = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  background-color: ${colors.whiteTwo};
  margin-bottom: 1rem;
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
      <Text>{getProductTitle(item)}</Text>
      {hasPrice(item, 'salePrice') && (
        <Text fontWeight="bold" color={colors.lipstick}>
          {getPrice(item, 'salePrice')} €
        </Text>
      )}
    </article>
  );
};

ProductItem.propTypes = {
  items: PropTypes.array,
};

export default ProductItem;
