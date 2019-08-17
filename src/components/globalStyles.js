import { createGlobalStyle, css } from 'styled-components';
import { normalize } from 'polished';
import { colors, fonts } from '@theme';

export const globalNormalize = css`
  html {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  body {
    background-color: ${colors.white};
    color: ${colors.black};
    font-family: ${fonts.text};
    font-size: 16px;
    line-height: 1.4;

    strong {
      font-weight: 700;
    }
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0;
    font-weight: 400;
  }

  ul,
  ol,
  dl {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  main {
    display: block;
  }
`;

// Global Styles
export const GlobalStyles = createGlobalStyle`
  /* autoprefixer grid: autoplace */
  ${normalize()};

  /* Disable scroll on body since we implement it in layouts */
  html, body {
    overflow: hidden;
    height: 100%;
    width: 100%;
    position: fixed; /* Disable overscroll: https://www.bram.us/2016/05/02/prevent-overscroll-bounce-in-ios-mobilesafari-pure-css/ */
  }

  ${globalNormalize};

`;
