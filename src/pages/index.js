import React from 'react';
import { MainLayout } from '../layouts';
import SEO from '../components/seo';

const IndexPage = () => {
  return (
    <MainLayout>
      <SEO title="Accueil" />
      slider <br /> contenu <br /> etc
    </MainLayout>
  );
};

export default IndexPage;
