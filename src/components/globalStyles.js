import { createGlobalStyle, css } from 'styled-components';
import { normalize } from 'polished';
import { colors, fonts } from '@theme';

export const globalNormalize = css`
  html {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-y: scroll;
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

  ${globalNormalize};

`;
