import React from 'react';

import { MainLayout } from '@layouts';
import SEO from '@components/seo';

const NotFoundPage = () => (
  <MainLayout>
    <SEO title="Merci" />
    <h1>Votre message</h1>
    <p>Votre message a bien été envoyé, à très vite !</p>
  </MainLayout>
);

export default NotFoundPage;
