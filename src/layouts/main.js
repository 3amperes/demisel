/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Box } from 'rebass/styled-components';
import { Header } from '../components/header';
import { Footer } from '../components/footer';
import Banner from '../components/banner';
import { GlobalContext } from '@components/globalStore';

const MainLayout = ({ children, headerFloat, ...rest }) => {
  const {
    state: { hasBanner },
  } = useContext(GlobalContext);

  const d = typeof document !== undefined ? document : null;

  useEffect(() => {
    if (d) {
      window.Snipcart.api.session.setLanguage('fr', {
        actions: {
          continue_shopping: 'Continuer le shopping',
        },
      });
    }
  }, [d]);

  return (
    <>
      {hasBanner && <Banner />}
      <Box {...rest} style={{ position: 'relative' }}>
        <Header isFloat={headerFloat} />
        <main style={{ minHeight: '400px', position: 'relative', zIndex: 0 }}>
          {children}
        </main>
        <Footer />
      </Box>
    </>
  );
};

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MainLayout;
