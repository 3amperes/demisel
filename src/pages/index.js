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

const IntroWrapper = styled.section`
  background-color: ${colors.ligthPeach};
  background-image: linear-gradient(111deg, rgba(215, 239, 244, 0), #cbebf2);
  padding-top: 120px;
  padding-bottom: 260px;
  position: relative;
`;
const IntroInner = styled(Box)`
  position: absolute;
  margin: auto;
  width: 100%;
  bottom: 120px;

  > div {
    ${container}
  }
`;

const Intro = ({ title, image, description }) => {
  console.log({ image });
  return (
    <IntroWrapper>
      <Box ml="auto" width="50%">
        {image && <Image fluid={image.asset.fluid} />}
      </Box>
      <IntroInner>
        <div>
          <Box bg="white" py="12em" px="8em" width="60%">
            {title && (
              <Heading fontSize={[32, 48]} as="h1" mb="1rem">
                {title}
              </Heading>
            )}
            {description && <BlockContent blocks={description} />}
          </Box>
        </div>
      </IntroInner>
    </IntroWrapper>
  );
};

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
                      fluid(maxWidth: 1200) {
                        ...GatsbySanityImageFluid
                      }
                    }
                  }
                }
                pushes {
                  title
                  introduction
                  items {
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
        return (
          <MainLayout headerFloat={true}>
            <SEO title="Accueil" />
            <Carousel items={carousel} />
            <Intro
              title={introduction.title}
              image={introduction.image}
              description={_rawIntroduction.description}
            />
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
