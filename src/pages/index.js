import React, { useContext } from 'react';
import { StaticQuery, graphql } from 'gatsby';
import { MainLayout } from '../layouts';
import SEO from '../components/seo';
import Newsletter from '../components/newsletter';
// import Instagram from '../components/instagram';
import Commitments from '../components/commitments';
import Carousel from '../components/carousel';
import Intro from '../components/intro';
import Pushes from '../components/pushes';
import { GlobalContext } from '@components/globalStore';

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
                fluid(maxWidth: 1400) {
                  ...GatsbySanityImageFluid
                }
              }
            }
            mobileImage {
              asset {
                fluid(maxWidth: 740) {
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
          banner {
            isDisplay
          }
        }
      }
    }
  }
`;

const IndexPage = () => {
  const {
    state: { hasBanner },
  } = useContext(GlobalContext);
  return (
    <StaticQuery
      query={query}
      render={data => {
        const {
          carousel,
          introduction,
          _rawIntroduction,
          pushes,
          banner,
        } = data.allSanityConfig.edges[0].node;
        return (
          <MainLayout headerFloat={true}>
            <SEO title="Accueil" />
            <Carousel
              items={carousel}
              hasBanner={hasBanner && banner.isDisplay}
            />
            <Intro
              id="intro"
              title={introduction.title}
              subtitle={introduction.subtitle}
              image={introduction.image}
              description={_rawIntroduction.description}
            />
            <Pushes pushes={pushes} />
            <Commitments />
            {/* <Instagram /> */}
            <Newsletter />
          </MainLayout>
        );
      }}
    />
  );
};

export default IndexPage;
