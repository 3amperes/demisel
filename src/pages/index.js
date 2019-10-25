import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';
import { Box, Flex, Heading } from 'rebass/styled-components';
import { MainLayout } from '../layouts';
import SEO from '../components/seo';
import Newsletter from '../components/newsletter';
import Instagram from '../components/instagram';
import Commitments from '../components/commitments';
import Carousel from '../components/carousel';
import { colors } from '@theme';

const Intro = styled.section`
  background-color: ${colors.ligthPeach};
  background-image: linear-gradient(111deg, rgba(215, 239, 244, 0), #cbebf2);
  padding: 120px 0;
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
              }
            }
          }
        }
      `}
      render={data => {
        const config = data.allSanityConfig.edges[0];
        return (
          <MainLayout headerFloat={true}>
            <SEO title="Accueil" />
            <Carousel items={config.node.carousel} />
            <Intro></Intro>
            <Pushes></Pushes>
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
