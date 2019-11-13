import React from 'react';
import { StaticQuery, graphql, Link } from 'gatsby';
import BlockContent from '@sanity/block-content-to-react';
import Image from 'gatsby-image';
import styled from 'styled-components';
import { Box, Heading, Text, Flex } from 'rebass/styled-components';
import { MainLayout } from '../layouts';
import SEO from '../components/seo';
import Newsletter from '../components/newsletter';
import Instagram from '../components/instagram';
import Commitments from '../components/commitments';
import Carousel from '../components/carousel';
import Go from '@components/go';
import { colors } from '@theme';
import { container, link } from '@utils/mixins';

const IntroWrapper = styled.section`
  background-color: ${colors.ligthPeach};
  background-image: linear-gradient(111deg, rgba(215, 239, 244, 0), #cbebf2);
  padding-top: 120px;
  padding-bottom: 260px;
  position: relative;
  display: grid;
  grid-template-columns: 1fr repeat(6, minmax(80px, 140px)) 1fr;
  grid-template-rows: 80px 1fr auto 120px 120px;
  grid-gap: 40px;

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

    a {
      ${link(colors.lipstick)};
    }
  }
`;

const Intro = ({ title, image, description, subtitle }) => {
  return (
    <IntroWrapper>
      {image && <Image fluid={image.asset.fluid} className="intro-image" />}
      <Box bg="white" py="10em" px="5em" className="intro-content">
        {title && (
          <Heading fontSize={[32, 48]} as="h1" mb="1rem">
            {title}
          </Heading>
        )}
        {subtitle && (
          <Heading fontSize={[24, 32]} as="h2" mb="1rem">
            {subtitle}
          </Heading>
        )}
        {description && <BlockContent blocks={description} />}
        <Link to="/shop">Découvrir nos bijoux</Link>
      </Box>
    </IntroWrapper>
  );
};

const PushesWrapper = styled.section`
  ${container};
  padding: 120px 0;
  background-color: ${colors.white};
  columns: 2;
  column-gap: 40px;
  break-inside: avoid;

  header,
  footer {
    margin-bottom: 40px;
  }

  footer {
    a {
      ${link(colors.lipstick)};
    }
  }

  .pushes-item {
    display: block;
    position: relative;
    margin-bottom: 40px;
    overflow: hidden;

    .gatsby-image-wrapper,
    .pushes-title-arrow {
      transition: all 250ms ease-in-out;
    }

    &:hover {
      .gatsby-image-wrapper {
        transform: scale(1.1) rotate(-2deg);
      }
      .pushes-title-arrow {
        transform: translateX(-1em);
      }
    }
    &-title {
      position: absolute;
      width: 100%;
      bottom: 0;
      padding: 2rem;
      color: ${colors.white};
      z-index: 2;
      align-items: center;
    }
  }
`;

const Pushes = ({ pushes }) => {
  const { title, introduction, items } = pushes;
  return (
    <PushesWrapper>
      {(introduction || title) && (
        <Box as="header" py="2rem" className="pushes-introduction">
          {title && (
            <Heading fontSize={[32, 48]} lineHeight="1.2" as="h2" mb="1rem">
              {title}
            </Heading>
          )}
          {introduction && <Text>{introduction}</Text>}
        </Box>
      )}
      {items.length > 0 &&
        items.map(item => {
          return (
            <a href={item.link} key={item._id} className="pushes-item">
              <Flex className="pushes-item-title">
                <Heading fontSize={[24]} as="h3" mr="auto">
                  {item.title}
                </Heading>
                <Go className="pushes-title-arrow" />
              </Flex>
              <Image fluid={item.thumbnail.asset.fluid} />
            </a>
          );
        })}
      <Box as="footer" textAlign="center" className="pushes-footer">
        <Heading fontSize={[32, 48]} lineHeight="1.2" as="h2" mb="1rem">
          Découvrez <br /> tous nos bijoux
        </Heading>
        <Box mt="1rem">
          <Link to="/shop">Accédez à l'E-shop</Link>
        </Box>
      </Box>
    </PushesWrapper>
  );
};

const query = graphql`
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
              link
              thumbnail {
                asset {
                  fluid(maxWidth: 400) {
                    ...GatsbySanityImageFluid
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

const IndexPage = () => {
  return (
    <StaticQuery
      query={query}
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
            <Pushes pushes={pushes} />
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
