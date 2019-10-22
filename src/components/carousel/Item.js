import React from 'react';
import Image from 'gatsby-image';
import styled from 'styled-components';
import { Box, Flex, Heading, Text } from 'rebass/styled-components';
import { colors } from '@theme';
import { container } from '@utils/mixins';

const Wrapper = styled(Box)`
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  opacity: ${props => (props.isCurrent ? 1 : 0)};
  position: ${props => (props.isCurrent ? 'relative' : 'absolute')};
  transition: all 250ms ease-in-out;
  background-color: pink;
`;
const Inner = styled(Flex)`
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  right: 0
  bottom: 0;
  align-items: center;
  color: ${colors.white};
`;

const Grid = styled(Box)`
  display: grid;
  grid-template-columns: 2fr 3fr;
  ${container};
`;

const Button = styled.button`
  color: currentColor;
  font-weight: 700;
  font-size: 14px;
  border: none;
  outline: none;
  background-color: transparent;
  cursor: pointer;
  padding: 0;
  &:after {
    content: '';
    display: block;
    width: 100%;
    height: 2px;
    margin-top: 2px;
    background-color: currentColor;
  }
`;

export default ({ slide, isCurrent }) => {
  console.log(isCurrent);
  return (
    <Wrapper isCurrent={isCurrent}>
      <Image height={400} fluid={slide.image.asset.childImageSharp.fluid} />
      <Inner>
        <Grid>
          <div>
            {slide.title && (
              <Heading fontSize={[32, 48]} lineHeight={1.2} as="h2" mb="1rem">
                {slide.title}
              </Heading>
            )}
            {slide.description && (
              <Text fontSize={14} lineHeight={1.8} mb="60px">
                {slide.description}
              </Text>
            )}
            {slide.link && <a href={slide.link.url}>{slide.link.label}</a>}
          </div>
        </Grid>
      </Inner>
    </Wrapper>
  );
};
