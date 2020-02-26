/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Box } from 'rebass/styled-components';
import { StaticQuery, graphql } from 'gatsby';
import { useCookies } from 'react-cookie';
import { Header } from '../components/header';
import { Footer } from '../components/footer';
import Banner from '../components/banner';
import CookieMessage from '../components/cookies';
import { GlobalContext } from '@components/globalStore';
import { browser } from '@utils/helpers';

const gaCookieKey = 'gatsby-gdpr-google-analytics';
const fbpCookieKey = 'gatsby-gdpr-facebook-pixel';

const MainLayout = ({ children, headerFloat, ...rest }) => {
  const {
    state: { hasBanner, displayCookieMessage },
    dispatch,
  } = useContext(GlobalContext);
  const [cookies, setCookie] = useCookies([gaCookieKey, fbpCookieKey]);
  const gaCookie = cookies[gaCookieKey];
  const fbpCookie = cookies[fbpCookieKey];

  useEffect(() => {
    if (!browser()) return;
    browser().Snipcart.api.session.setLanguage('fr-FR');
  }, []);

  useEffect(() => {
    if (gaCookie === undefined || fbpCookie === undefined) {
      setTimeout(() => {
        dispatch({ type: 'toggle_cookies', payload: true });
      }, 3000);
    }
  }, [gaCookie, fbpCookie, dispatch]);

  const closeCookieMessage = () => {
    dispatch({ type: 'toggle_cookies', payload: false });
  };

  const toggleCookies = value => {
    setCookie(gaCookieKey, value);
    setCookie(fbpCookieKey, value);
    closeCookieMessage();
  };

  return (
    <StaticQuery
      query={graphql`
        query {
          config: allSanityConfig {
            edges {
              node {
                banner {
                  isDisplay
                }
              }
            }
          }
        }
      `}
      render={data => (
        <>
          {hasBanner && data.config.edges[0].node.banner.isDisplay && (
            <Banner />
          )}
          <Box {...rest} style={{ position: 'relative' }}>
            <Header isFloat={headerFloat} />
            <main
              style={{ minHeight: '400px', position: 'relative', zIndex: 0 }}
            >
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
      )}
    />
  );
};

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MainLayout;
