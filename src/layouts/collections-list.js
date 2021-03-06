import React from 'react';
import { graphql, Link } from 'gatsby';
import Image from 'gatsby-image';
import styled from 'styled-components';
import { Flex, Box, Heading, Text } from 'rebass/styled-components';
import { colors } from '@theme';
import MainLayout from './main';
import SEO from '@components/seo';
import Go from '@components/go';
import { container, coloredSection, filigrane } from '@utils/mixins';
import { useBreakpoint } from '@utils/hooks';

const offset = 200;

const Header = styled(Flex)`
  ${coloredSection('600px')};
  padding-top: 1rem;
  padding-bottom: ${offset}px;
`;
const List = styled.ol`
  ${container};
  margin-top: -${offset}px;

  li {
    position: relative;
    margin-bottom: 2rem;
  }
`;

const ImageWrapper = styled.div`
  background-color: ${colors.whiteTwo};
  line-height: 0;
  transition: all 250ms ease;
  ${filigrane};

  &:hover {
    transform: scale(1.05);
  }
`;

const ItemTitle = styled(Flex)`
  position: absolute;
  width: 100%;
  left: 0;
  bottom: 0;
  color: ${colors.white};
  padding: 2rem;
  align-items: center;
`;

const Collections = ({ data }) => {
  const isDesktop = useBreakpoint('desktop');
  const collections = data && data.collections ? data.collections.edges : [];

  return (
    <MainLayout>
      <SEO title="Collections" />
      <Header>
        <Box maxWidth="320px" textAlign="center" px="1rem">
          <Heading fontSize={[32, 48]} as="h1" mb="1rem">
            Collections
          </Heading>
          <Text fontSize={14} lineHeight={1.8}>
            Découvrez sous la forme d’un look book éditorial tous nos modèles de
            bijoux posés et portés afin que vous puissiez avoir la meilleure
            vision possible.
          </Text>
        </Box>
      </Header>
      {collections && collections.length > 0 && (
        <List>
          {collections.map(({ node: item }) => (
            <li key={item.id}>
              <Link to={`/collections/${item.slug.current}`}>
                <ImageWrapper>
                  {!isDesktop && item.mobileThumbnail ? (
                    <Image
                      style={{ width: '100%' }}
                      fluid={item.mobileThumbnail.asset.fluid}
                    />
                  ) : item.thumbnail ? (
                    <Image
                      style={{ maxWidth: '100%' }}
                      fixed={item.thumbnail.asset.fixed}
                    />
                  ) : null}
                </ImageWrapper>

                <ItemTitle>
                  <Heading
                    fontSize={24}
                    as="h2"
                    style={{ textTransform: 'capitalize' }}
                    mr="auto"
                  >
                    {item.title}
                  </Heading>
                  <Go />
                </ItemTitle>
              </Link>
            </li>
          ))}
        </List>
      )}
    </MainLayout>
  );
};

export default Collections;

export const query = graphql`
  query {
    collections: allSanityCollection(
      filter: { editorial: { eq: true } }
      sort: { fields: order, order: ASC }
    ) {
      edges {
        node {
          id
          slug {
            current
          }
          title
          thumbnail {
            alt
            asset {
              fixed(width: 1076, height: 446) {
                ...GatsbySanityImageFixed
              }
            }
          }
          mobileThumbnail {
            alt
            asset {
              fluid(maxWidth: 446, maxHeight: 446) {
                ...GatsbySanityImageFluid
              }
            }
          }
        }
      }
    }
  }
`;
