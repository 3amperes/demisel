import React from 'react';
import Image from 'gatsby-image';
import styled from 'styled-components';
import { Box, Flex, Heading, Text } from 'rebass/styled-components';
import { colors } from '@theme';
import { container, link } from '@utils/mixins';

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

const Link = styled.a`
  ${link()}
`;

const ItemContent = ({ title, description, link }) => (
  <Inner>
    <Grid>
      <div>
        {title && (
          <Heading fontSize={[32, 48]} lineHeight={1.2} as="h2" mb="1rem">
            {title}
          </Heading>
        )}
        {description && (
          <Text fontSize={14} lineHeight={1.8} mb="60px">
            {description}
          </Text>
        )}
        {link && <Link href={link.url}>{link.label}</Link>}
      </div>
    </Grid>
  </Inner>
);

export default ({ item, isCurrent }) => {
  const { image, ...rest } = item;
  return (
    <Wrapper isCurrent={isCurrent}>
      <Image height={400} fluid={image.asset.fluid} />
      <ItemContent {...rest} />
    </Wrapper>
  );
};
