/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Box } from 'rebass/styled-components';
import { useCookies } from 'react-cookie';
import { Header } from '../components/header';
import { Footer } from '../components/footer';
import Banner from '../components/banner';
import CookieMessage from '../components/cookies';
import { GlobalContext } from '@components/globalStore';
import { browser } from '@utils/helpers';

const gaCookieKey = 'gatsby-gdpr-google-analytics';

const MainLayout = ({ children, headerFloat, ...rest }) => {
  const {
    state: { hasBanner },
  } = useContext(GlobalContext);
  const [cookies, setCookie] = useCookies([gaCookieKey]);
  const gaCookie = cookies[gaCookieKey];
  const [displayCookieMessage, setDisplayCookieMessage] = useState(false);

  useEffect(() => {
    if (!browser()) return;
    browser().Snipcart.api.session.setLanguage('fr-FR');
  }, []);

  useEffect(() => {
    if (gaCookie === undefined) {
      setDisplayCookieMessage(true);
    }
  }, [gaCookie]);

  const closeCookieMessage = () => {
    setDisplayCookieMessage(false);
  };

  const toggleCookies = value => {
    setCookie(gaCookieKey, value);
    closeCookieMessage();
  };

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
      {displayCookieMessage && (
        <CookieMessage
          toggleCookie={toggleCookies}
          onClose={closeCookieMessage}
        />
      )}
    </>
  );
};

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MainLayout;
