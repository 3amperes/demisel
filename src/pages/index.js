import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import { MainLayout } from '../layouts';
import SEO from '../components/seo';
import Newsletter from '../components/newsletter';
import Instagram from '../components/instagram';
import Commitments from '../components/commitments';
import Carousel from '../components/carousel';
import Intro from '../components/intro';
import Pushes from '../components/pushes';

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
                fluid(maxWidth: 1800) {
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
            subtitle
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
              subtitle={introduction.subtitle}
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
