/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';
import { Box } from 'rebass/styled-components';
import { Header } from '../components/header';
import { Footer } from '../components/footer';
import Banner from '../components/banner';

const Wrapper = ({ children, banner }) => {
  const [displayBanner, setDisplayBanner] = useState(banner.isDisplay);
  return (
    <>
      {displayBanner && (
        <Banner
          title={banner.title}
          desc={banner.description}
          onClose={() => setDisplayBanner(false)}
        ></Banner>
      )}
      {children}
    </>
  );
};

const MainLayout = ({ children, headerFloat, ...rest }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
        config: allSanityConfig {
          edges {
            node {
              banner {
                isDisplay
                title
                description
              }
            }
          }
        }
      }
    `}
    render={data => (
      <Wrapper banner={data.config.edges[0].node.banner}>
        <Box {...rest} style={{ position: 'relative' }}>
          <Header
            siteTitle={data.site.siteMetadata.title}
            isFloat={headerFloat}
          />
          <main style={{ minHeight: '400px', position: 'relative', zIndex: 0 }}>
            {children}
          </main>
          <Footer />
        </Box>
      </Wrapper>
    )}
  />
);

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MainLayout;
