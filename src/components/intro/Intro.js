import React from 'react';
import { Link } from 'gatsby';
import BlockContent from '@sanity/block-content-to-react';
import Image from 'gatsby-image';
import styled from 'styled-components';
import { Box, Heading } from 'rebass/styled-components';
import { up, down } from 'styled-breakpoints';
import { colors } from '@theme';
import { link } from '@utils/mixins';

const IntroWrapper = styled.section`
  background-color: ${colors.ligthPeach};
  background-image: linear-gradient(111deg, rgba(215, 239, 244, 0), #cbebf2);
  padding-top: 120px;
  padding-bottom: 120px;
  position: relative;

  ${up('tablet')} {
    display: grid;
    grid-template-columns: 1fr repeat(6, minmax(80px, 140px)) 1fr;
    grid-template-rows: 80px 1fr auto 120px 120px;
    grid-gap: 40px;
    padding-bottom: 260px;
  }

  .intro-image {
    grid-column: 4 / span 6;
    grid-row: 2 / span 2;
    position: relative;
    z-index: 1;
  }
  .intro-content {
    grid-column: 2 / span 3;
    grid-row: 3 / span 2;
    position: relative;
    z-index: 2;
    ${down('desktop')} {
      margin-right: 2rem;
      position: relative;
      top: -2rem;
    }

    a {
      ${link(colors.lipstick)};
    }
  }
`;

export default ({ title, image, description, subtitle }) => {
  return (
    <IntroWrapper>
      {image && <Image fluid={image.asset.fluid} className="intro-image" />}
      <Box
        bg="white"
        py={[20, '10em']}
        px={[20, '5em']}
        className="intro-content"
      >
        {title && (
          <Heading fontSize={[32, 40]} as="h1" mb="2rem" lineHeight={1.2}>
            {title}
          </Heading>
        )}
        {subtitle && (
          <Heading fontSize={[20, 24]} as="h2" mb="2rem" lineHeight={1.2}>
            {subtitle}
          </Heading>
        )}
        {description && <BlockContent blocks={description} />}
        <Box pt="1rem">
          <Link to="/shop">Découvrir nos bijoux</Link>
        </Box>
      </Box>
    </IntroWrapper>
  );
};
