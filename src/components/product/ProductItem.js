import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Image from 'gatsby-image';
import { Link } from 'gatsby';
import { motion } from 'framer-motion';
import { Text } from 'rebass/styled-components';
import { getProductTitle } from '@utils';
import { colors } from '@theme';
import Price from './Price';

const hover = {
  on: { opacity: 0 },
  off: { opacity: 1 },
};

const Thumbnail = styled(motion.div)`
  background-color: ${colors.whiteTwo};
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Figure = styled.figure`
  position: relative;
  padding: 0;
  margin: 0;

  a {
    position: absolute;
    display: inline-block;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    line-height: 1;
  }
`;

const ProductItem = ({ item }) => {
  const [isHover, setIsHover] = useState(false);

  const image =
    item.model.images &&
    item.model.images.length > 0 &&
    item.model.images[0].asset;

  const handleMouseEnter = () => {
    setIsHover(true);
  };
  const handleMouseLeave = () => {
    setIsHover(false);
  };
  return (
    <article>
      <Figure>
        {image && <Image fixed={image.fixed} width="100%" />}
        <Link
          to={`/product/${item.id}`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {item.thumbnail ? (
            <Thumbnail
              animate={isHover ? 'on' : 'off'}
              variants={hover}
              initial="off"
            >
              <Image
                style={{
                  width: '80%',
                  height: '80%',
                }}
                fluid={item.thumbnail.asset.fluid}
              />
            </Thumbnail>
          ) : (
            item.title
          )}
        </Link>
      </Figure>
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
