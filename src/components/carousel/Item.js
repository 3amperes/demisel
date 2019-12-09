import React, { useState } from 'react';
import Image from 'gatsby-image';
import styled from 'styled-components';
import { up } from 'styled-breakpoints';
import { Box, Flex, Heading, Text } from 'rebass/styled-components';
import { colors } from '@theme';
import { container, link } from '@utils/mixins';
import { useBreakpoint } from '@utils/hooks';

const Wrapper = styled(Box)`
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  opacity: ${props => (props.isCurrent ? 1 : 0)};
  position: ${props => (props.isCurrent ? 'relative' : 'absolute')};
  z-index: ${props => (props.isCurrent ? 1 : 0)};
  transition: all 450ms ease-in-out;
`;

const Filigrane = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  opacity: 0.5;
  background-image: linear-gradient(
    to right,
    rgba(0, 0, 0, 1) 0%,
    rgba(84, 84, 84, 0) 100%
  );
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
  align-items: end;
  height: 100%;
  ${container};

  ${up('tablet')} {
    grid-template-columns: 2fr 3fr;
    align-items: center;
  }
`;

const Link = styled.a`
  ${link()}
`;

const ItemContent = ({ title, description, link }) => (
  <Inner>
    <Grid>
      <Box pb={[100, 0]}>
        {title && (
          <Heading fontSize={[32, 48]} lineHeight={1.2} as="h2" mb="1rem">
            {title}
          </Heading>
        )}
        {description && (
          <Text fontSize={14} lineHeight={1.8} mb={[20, 60]}>
            {description}
          </Text>
        )}
        {link && <Link href={link.url}>{link.label}</Link>}
      </Box>
    </Grid>
  </Inner>
);

export default ({ item, isCurrent }) => {
  const { image, mobileImage, ...rest } = item;
  const [isImageReady, setIsImageReady] = useState(false);
  const isDesktop = useBreakpoint('desktop');
  const onLoad = () => {
    setIsImageReady(true);
  };
  return (
    <Wrapper isCurrent={isCurrent}>
      {!isDesktop && mobileImage ? (
        <Image
          style={{ height: '100vh' }}
          fluid={mobileImage.asset.fluid}
          onLoad={onLoad}
        />
      ) : (
        <Image
          style={{ height: '100vh' }}
          fluid={image.asset.fluid}
          onLoad={onLoad}
        />
      )}
      {isImageReady && <Filigrane />}
      <ItemContent {...rest} />
    </Wrapper>
  );
};
