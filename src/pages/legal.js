import React from 'react';
import styled from 'styled-components';
import { Link, graphql } from 'gatsby';
import BlockContent from '@sanity/block-content-to-react';
import { Heading, Text, Box } from 'rebass/styled-components';
import { MainLayout } from '@layouts';
import { coloredSection, link, container, richText } from '@utils/mixins';
import { colors } from '@theme';
import SEO from '@components/seo';
import Newsletter from '@components/newsletter';

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

const serializers = {
  marks: {
    link: ({ mark, children }) => (
      <a href={mark.href} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    ),
  },
};

const Legal = ({ data }) => {
  return (
    <MainLayout>
      <SEO title="Mentions légales" />
      <Header>
        <Heading as="h1" fontSize={[32, 56]} lineHeight="1.2" mb="0.5em">
          Mentions Légales
        </Heading>
        <Text
          maxWidth="340px"
          color="greyishBrown"
          fontSize={14}
          lineHeight="24px"
          textAlign="center"
        >
          Nous évoluons, grandissons et nous épanouissons dans une volonté de
          transparence avec toutes les personnes qui travaillent avec nous. Si
          vous souhaitez en savoir plus ou si vous souffrez d’insomnie,
          consultez nos mentions légales.
        </Text>
        <Link to="/cgu">
          <Text mt="1.5rem">Ou lisez nos conditions générales de vente</Text>
        </Link>
      </Header>
      <Inner py={[20, 75]} color="greyishBrown" px="1rem">
        <BlockContent
          blocks={data.config.edges[0].node._rawLegal}
          serializers={serializers}
        />
      </Inner>
      <Newsletter />
    </MainLayout>
  );
};

export default Legal;

export const query = graphql`
  query legal {
    config: allSanityConfig {
      edges {
        node {
          _rawLegal
        }
      }
    }
  }
`;
