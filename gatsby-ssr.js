import React from 'react';
export { wrapRootElement } from './gatsby-browser';

let warning = false;

export const onRenderBody = ({ setHeadComponents }) => {
  const options = Object.assign(
    {
      apiKey: process.env.GATSBY_SNIPCART_API_KEY,
      js: 'https://cdn.snipcart.com/themes/v3.0.4/default/snipcart.js',
      styles: 'https://cdn.snipcart.com/themes/v3.0.4/default/snipcart.css',
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
    <div hidden id="snipcart" data-api-key={options.apiKey}></div>,
    <script src={options.js}></script>,
  ];

  if (options.styles) {
    components.push(<link rel="stylesheet" href={options.styles} />);
  }

  return setPostBodyComponents(components);
};
