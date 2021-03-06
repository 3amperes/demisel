import React from 'react';

import { MainLayout } from '@layouts';
import SEO from '@components/seo';

const NotFoundPage = () => (
  <MainLayout>
    <SEO title="404: Not found" />
    <h1>NOT FOUND</h1>
    <p>Cette route n'existe pas !</p>
  </MainLayout>
);

export default NotFoundPage;
