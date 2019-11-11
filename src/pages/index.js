import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import BlockContent from '@sanity/block-content-to-react';
import Image from 'gatsby-image';
import styled from 'styled-components';
import { Box, Flex, Heading } from 'rebass/styled-components';
import { MainLayout } from '../layouts';
import SEO from '../components/seo';
import Newsletter from '../components/newsletter';
import Instagram from '../components/instagram';
import Commitments from '../components/commitments';
import Carousel from '../components/carousel';
import { colors } from '@theme';
import { container, link } from '@utils/mixins';

const Intro = styled.section`
  background-color: ${colors.ligthPeach};
  background-image: linear-gradient(111deg, rgba(215, 239, 244, 0), #cbebf2);
  padding: 120px 0;
`;

const IntroInner = styled(Box)`
  ${container};
  > div {
    background-color: ${colors.white};
    padding: 2rem;
    max-width: 515px;
  }
`;

const Pushes = styled.section`
  background-color: ${colors.white};
  padding: 120px 0;
`;

const IndexPage = () => {
  return (
    <StaticQuery
      query={graphql`
        query {
          allSanityConfig {
            edges {
              node {
                id
                carousel {
                  _key
                  image {
                    asset {
                      fluid(maxWidth: 2000) {
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
                _rawIntroduction
                introduction {
                  title
                  image {
                    asset {
                      fluid(maxWidth: 800) {
                        ...GatsbySanityImageFluid
                      }
                    }
                  }
                }
                pushes {
                  title
                  introduction
                  items {
                    _id
                    title
                  }
                }
              }
            }
          }
        }
      `}
      render={data => {
        const {
          carousel,
          introduction,
          _rawIntroduction,
          pushes,
        } = data.allSanityConfig.edges[0].node;
        console.log({ introduction });
        return (
          <MainLayout headerFloat={true}>
            <SEO title="Accueil" />
            <Carousel items={carousel} />
            <Intro>
              <Box ml="auto" width="50%">
                {introduction.image && (
                  <Image fluid={introduction.image.asset.fluid} />
                )}
              </Box>
              <IntroInner>
                <div>
                  <Heading fontSize={[32, 48]} as="h1" mb="1rem">
                    {introduction.title}
                  </Heading>
                  {_rawIntroduction && _rawIntroduction.description && (
                    <BlockContent blocks={_rawIntroduction.description} />
                  )}
                </div>
              </IntroInner>
            </Intro>
            <Pushes>
              {pushes.items.map(item => {
                return (
                  <li key={item._id}>
                    <Heading fontSize={[18]} as="h3">
                      {item.title}
                    </Heading>
                  </li>
                );
              })}
            </Pushes>
            <Commitments />
            <Instagram />
            <Newsletter />
          </MainLayout>
        );
      }}
    />
  );
};

export default IndexPage;
