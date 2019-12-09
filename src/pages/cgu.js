import React from 'react';
import { Link, graphql } from 'gatsby';
import BlockContent from '@sanity/block-content-to-react';
import styled from 'styled-components';
import { Heading, Text, Box } from 'rebass/styled-components';
import { MainLayout } from '@layouts';
import { colors } from '@theme';
import { coloredSection, link, container, richText } from '@utils/mixins';
import SEO from '@components/seo';
import Newsletter from '@components/newsletter';

const serializers = {
  marks: {
    link: ({ mark, children }) => (
      <a href={mark.href} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    ),
  },
};

const Header = styled.header`
  ${coloredSection('738px', '-15deg')};

  a {
    ${link(colors.lipstick)};
  }
`;

const Inner = styled(Box)`
  ${container};
  ${richText}
`;

export default ({ data }) => {
  return (
    <MainLayout>
      <SEO title="Conditions Générales de vente" />
      <Header>
        <Heading as="h1" fontSize={[32, 56]} lineHeight="1.2" mb="0.5em">
          CGV
        </Heading>
        <Text
          maxWidth="340px"
          color="greyishBrown"
          fontSize={14}
          lineHeight="24px"
          textAlign="center"
        >
          Penez connaissance ci-après de nos conditions générales de vente.
        </Text>

        <Link to="/legal">
          <Text mt="1.5rem">Ou lisez nos mentions légales</Text>
        </Link>
      </Header>
      <Inner py={[20, 75]} px="1rem">
        <BlockContent
          blocks={data.config.edges[0].node._rawCgu}
          serializers={serializers}
        />
      </Inner>
      <Newsletter />
    </MainLayout>
  );
};

export const query = graphql`
  query cgu {
    config: allSanityConfig {
      edges {
        node {
          _rawCgu
        }
      }
    }
  }
`;
