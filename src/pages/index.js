import React from 'react';
import { MainLayout } from '../layouts';
import SEO from '../components/seo';
import Newsletter from '../components/newsletter';
import Instagram from '../components/instagram';

const IndexPage = () => {
  return (
    <MainLayout>
      <SEO title="Accueil" />
      <Instagram />
      <Newsletter />
    </MainLayout>
  );
};

export default IndexPage;
