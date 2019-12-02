import React from 'react';
import styled from 'styled-components';
import BlockContent from '@sanity/block-content-to-react';
import Image from 'gatsby-image';
import { graphql } from 'gatsby';
import { Box, Flex, Heading, Text } from 'rebass/styled-components';
import SEO from '@components/seo';

import { colors } from '@theme';
import MainLayout from './main';

import { container, link, coloredSection } from '@utils/mixins';

const offset = 200;

const Wrapper = styled.article`
  .main {
    ${container}
    margin-top: -${offset}px;
  }
`;

const Link = styled.a`
  ${link(colors.lipstick)};
`;

const Header = styled(Flex)`
  ${coloredSection('600px')}
`;

const ItemWrapper = styled(Box)`
  > a {
    display: block;
    color: inherit;

    &:after {
      display: none;
    }
  }
`;

const ImagesWrapper = styled(Flex)`
  div:first-child {
    order: 1;
  }

  div:last-child {
    order: 0;

    li:nth-child(odd) & {
      order: 2;
    }
  }
`;

const Item = ({ item }) => {
  const renderImages = () => (
    <ImagesWrapper py={[20, 100]}>
      {item.img1 && (
        <Box mt={20} mx="auto" width={[1, 1 / 2]}>
          <Image fluid={item.img1.asset.fluid} />
        </Box>
      )}
      {item.img2 && (
        <Box mt={[20, 20, -100]} mx="auto" width={[1, 1 / 2]}>
          <Image fluid={item.img2.asset.fluid} />
        </Box>
      )}
    </ImagesWrapper>
  );
  return (
    <ItemWrapper mb={[40, 200]}>
      {item.link ? (
        <Link href={item.link.url}>{renderImages()}</Link>
      ) : (
        renderImages()
      )}

      <Box textAlign="center">
        <Heading fontSize={[24, 40]} as="h2" mb="1rem">
          {item.title}
        </Heading>
        <Text>{item.description}</Text>
        {item.link && <Link href={item.link.url}>{item.link.label}</Link>}
      </Box>
    </ItemWrapper>
  );
};

const Collection = ({ data }) => {
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
        {sections.length > 0 && (
          <ol className="main">
            {sections.map((section, index) => (
              <li key={index}>
                <Item item={section} />
              </li>
            ))}
          </ol>
        )}
      </Wrapper>
    </MainLayout>
  );
};

export default Collection;

export const query = graphql`
  query($id: String) {
    sanityCollection(id: { eq: $id }) {
      id
      title
      _rawDescription
      sections {
        img1 {
          alt
          asset {
            fluid(maxWidth: 538, maxHeight: 644) {
              ...GatsbySanityImageFluid
            }
          }
        }
        img2 {
          alt
          asset {
            fluid(maxWidth: 538, maxHeight: 644) {
              ...GatsbySanityImageFluid
            }
          }
        }
        title
        description
        link {
          label
          url
        }
      }
    }
  }
`;
