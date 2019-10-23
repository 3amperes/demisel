import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import { MainLayout } from '../layouts';
import SEO from '../components/seo';
import Newsletter from '../components/newsletter';
import Instagram from '../components/instagram';
import Commitments from '../components/commitments';
import Carousel from '../components/carousel';

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
