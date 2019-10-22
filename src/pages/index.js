import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import { MainLayout } from '../layouts';
import SEO from '../components/seo';
import Newsletter from '../components/newsletter';
import Instagram from '../components/instagram';
import Commitments from '../components/commitments';
import Carousel from '../components/carousel';
import { log } from 'util';

// childImageSharp {
//   fluid(maxWidth: 1200) {
//     ...GatsbyImageSharpFluid
//   }
// }
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
                  image {
                    asset {
                      childImageSharp {
                        fluid(maxWidth: 1200) {
                          ...GatsbyImageSharpFluid
                        }
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
            <Carousel slides={config.node.carousel} />
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
