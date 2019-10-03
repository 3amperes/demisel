import React from 'react';
import { MainLayout } from '../layouts';
import SEO from '../components/seo';
import Newsletter from '../components/newsletter';

const IndexPage = () => {
  return (
    <MainLayout>
      <SEO title="Accueil" />
      <Newsletter />
    </MainLayout>
  );
};

export default IndexPage;
