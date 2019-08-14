/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */

// You can delete this file if you're not using it

const React = require('react');

let warning = false;

exports.onRenderBody = ({ setPostBodyComponents }) => {
  options = Object.assign(
    {
      apiKey: process.env.GATSBY_SNIPCART_API_KEY,
      autopop: false,
      js: 'https://cdn.snipcart.com/scripts/2.0/snipcart.js',
      jquery:
        'https://ajax.googleapis.com/ajax/libs/jquery/2.2.2/jquery.min.js',
      styles: 'https://cdn.snipcart.com/themes/2.0/base/snipcart.min.css',
    },
    {}
  );

  if (!options.apiKey) {
    if (!warning) {
      warning = true;
      console.log('No Snipcart API key found');
    }
    return;
  }

  const components = [
    <script
      key="snipcartJs"
      src={options.js}
      id="snipcart"
      data-api-key={options.apiKey}
      data-autopop={options.autopop}
    ></script>,
  ];
  if (options.jquery) {
    components.unshift(
      <script key="snipcartJquery" src={options.jquery}></script>
    );
  }
  if (options.styles) {
    components.push(
      <link
        key="snipcartStyle"
        href={options.styles}
        type="text/css"
        rel="stylesheet"
      />
    );
  }
  if (options.language) {
    components.push(
      <script key="snipcartLanguage" src={options.language}></script>
    );
  }

  // return setPostBodyComponents(components);
};
