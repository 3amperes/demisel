import React from 'react';
import styled from 'styled-components';
import { up } from 'styled-breakpoints';
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
  ${coloredSection('600px')};
  padding-top: 1rem;
  padding-bottom: ${offset}px;
  font-size: 14px;
`;

const ItemWrapper = styled(Box)`
  position: relative;

  > a {
    display: block;
    color: inherit;

    &:after {
      display: none;
    }
  }
`;

const ImagesWrapper = styled(Box)`
  ${up('desktop')} {
    display: flex;
    padding-bottom: ${offset / 3}px;
    div {
      position: relative;

      &:first-child {
        order: 1;
        top: 0;
      }
    }

    li:nth-child(even) & {
      > div:last-child {
        order: 0;
        top: ${offset / 3}px;
      }
    }

    li:nth-child(odd) & {
      > div:last-child {
        top: ${offset / 3}px;
        order: 2;
      }
    }
  }
`;

const Item = ({ item }) => {
  const renderImages = () => (
    <ImagesWrapper>
      {item.img1 && (
        <Box mx="auto" width={[1, 1 / 2]}>
          <Image fluid={item.img1?.asset?.fluid} className="image-title" />
        </Box>
      )}
      {item.img2 && (
        <Box mx="auto" width={[1, 1 / 2]}>
          <Image fluid={item.img2?.asset?.fluid} className="image-porte" />
        </Box>
      )}
    </ImagesWrapper>
  );
  return (
    <ItemWrapper mb={[80, 200]}>
      {item.link ? (
        <Link href={item.link.url}>{renderImages()}</Link>
      ) : (
        renderImages()
      )}

      <Box textAlign="center" mt={[20, 40]}>
        <Heading fontSize={[24, 40]} as="h2" mb="1rem">
          {item.title}
        </Heading>
        <Text mx="auto" maxWidth="300px">
          {item.description}
        </Text>
        {item.link && <Link href={item.link?.url}>{item.link?.label}</Link>}
      </Box>
    </ItemWrapper>
  );
};

const Collection = ({ data }) => {
  const { title, _rawDescription, sections, slug } = data.sanityCollection;
  return (
    <MainLayout>
      <SEO title={title} url={`/collections/${slug.current}`} />

      <Wrapper>
        <Header>
          <Box maxWidth="320px" textAlign="center" px="1rem">
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
      slug {
        current
      }
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
