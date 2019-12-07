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

const bg = {
  on: { opacity: 1, scale: 1 },
  off: { opacity: 0, scale: 1.4 },
};
const thumb = {
  on: { opacity: 0, y: '100%' },
  off: { opacity: 1, y: 0 },
};

const Thumbnail = styled(motion.div)`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 380px;
`;
const Background = styled(motion.div)`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
`;

const Figure = styled.figure`
  background-color: ${colors.whiteTwo};
  position: relative;
  padding: 0;
  margin: 0;
  overflow: hidden;
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
    <motion.article animate={isHover ? 'on' : 'off'} initial="off">
      <Figure>
        {image && (
          <Background variants={bg} className="bg">
            <Image
              fluid={image.fluid}
              style={{
                width: '100%',
                height: '100%',
              }}
            />
          </Background>
        )}
        <Thumbnail variants={thumb} className="thumb">
          <Image
            style={{
              width: '80%',
              height: '80%',
            }}
            fluid={item.thumbnail.asset.fluid}
          />
        </Thumbnail>
        <Link
          to={`/product/${item.id}`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        ></Link>
      </Figure>
      <Text mt="1rem" fontFamily="orpheuspro">
        {getProductTitle(item)}
      </Text>
      <Price item={item} />
    </motion.article>
  );
};

ProductItem.propTypes = {
  items: PropTypes.array,
};

export default ProductItem;
