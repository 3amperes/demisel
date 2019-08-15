import React from 'react';
import { GlobalProvider } from './src/components/globalStore.js';

export const wrapRootElement = ({ element }) => {
  return <GlobalProvider>{element}</GlobalProvider>;
};
