import React from 'react';
import styled from 'styled-components';
import BlockContent from '@sanity/block-content-to-react';
import Image from 'gatsby-image';
import { graphql } from 'gatsby';
import { Box, Flex, Heading } from 'rebass/styled-components';
import SEO from '@components/seo';

import { colors } from '@theme';
import MainLayout from './main';

import { container } from '@utils/mixins';

const offset = 200;

const Wrapper = styled.article`
  .main {
    ${container}
    margin-top: -${offset}px;

    li {
      margin-bottom: 200px;
    }
  }
`;

const Header = styled(Flex)`
  width: 100%;
  height: 600px;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: ${colors.ligthPeach};
  background-image: linear-gradient(111deg, rgba(215, 239, 244, 0), #cbebf2);
`;

const ProductDetail = ({ data }) => {
  const { title, _rawDescription, sections } = data.sanityCollection;
  return (
    <MainLayout>
      <SEO title={title} />

      <Wrapper>
        <Header>
          <Box width="350px" mb={`${offset}px`} textAlign="center">
            <Heading fontSize={[32, 48]} as="h1" mb="1rem">
              {title}
            </Heading>
            <BlockContent blocks={_rawDescription} />
          </Box>
        </Header>
        <ol className="main">
          {sections.map((section, index) => (
            <li key={index}>
              {section.thumbnail && (
                <Flex mb="200px">
                  <Image fixed={section.thumbnail.asset.fixed} />
                  <Image
                    fixed={section.thumbnail.asset.fixed}
                    style={{ position: 'relative', top: '100px' }}
                  />
                </Flex>
              )}
              <Box textAlign="center">
                <Heading fontSize={40} as="h2" mb="1rem">
                  {section.title}
                </Heading>
                <BlockContent blocks={section._rawDescription} />
              </Box>
            </li>
          ))}
        </ol>
      </Wrapper>
    </MainLayout>
  );
};

export default ProductDetail;

export const query = graphql`
  query($id: String) {
    sanityCollection(id: { eq: $id }) {
      id
      title
      _rawDescription

      sections {
        title
        _rawDescription
        thumbnail {
          alt
          asset {
            fixed(width: 538, height: 643) {
              ...GatsbySanityImageFixed
            }
          }
        }
      }
    }
  }
`;
