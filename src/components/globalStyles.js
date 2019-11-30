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

  p {
    margin: 0;
    margin-bottom: 1em;
  }

  main {
    display: block;
  }
`;

const snipCartStyles = css`
  .snipcart {
    font-family: ${fonts.text}!important;
    font-size: 16px !important;
    line-height: 1.4 !important;
  }

  .snipcart__font--secondary,
  .snipcart__font--subtitle,
  .snipcart-modal__close,
  .snipcart__actions--link {
    font-family: ${fonts.text}!important;
  }
  .snipcart__font--slim {
    font-weight: 400 !important;
  }
  .snipcart-cart-button--highlight,
  .snipcart__box--badge-highlight {
    background-image: none !important;
    background-color: ${colors.lipstick}!important;
    color: ${colors.white}!important;
    font-family: ${fonts.text}!important;
  }
  .snipcart-item-line__title,
  .snipcart-cart-header__title,
  .snipcart__font--subtitle {
    font-family: ${fonts.heading}!important;
  }
  .snipcart-cart-header__title {
    font-size: 32px !important;
  }
  .snipcart__actions--link,
  .snipcart-order__invoice-number--highlight {
    color: ${colors.lipstick}!important;
    font-weight: 500 !important;
  }
  .snipcart__icon--blue-dark path,
  .snipcart__icon--blue-light path {
    fill: ${colors.lipstick}!important;
  }
  .base--focus {
    border-color: ${colors.lipstick}!important;
  }
`;

// Global Styles
export const GlobalStyles = createGlobalStyle`
  /* autoprefixer grid: autoplace */
  ${normalize()};

  ${globalNormalize};
  ${snipCartStyles};

`;
