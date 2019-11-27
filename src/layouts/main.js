/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';
import { Box } from 'rebass/styled-components';
import { Header } from '../components/header';
import { Footer } from '../components/footer';

const MainLayout = ({ children, headerFloat, ...rest }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <Box {...rest}>
        <Header
          siteTitle={data.site.siteMetadata.title}
          isFloat={headerFloat}
        />
        <main style={{ minHeight: '400px', position: 'relative', zIndex: 0 }}>
          {children}
        </main>
        <Footer />
      </Box>
    )}
  />
);

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MainLayout;
