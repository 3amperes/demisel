import React from 'react';
import { MainLayout } from '../layouts';
import SEO from '../components/seo';
import Newsletter from '../components/newsletter';
import Instagram from '../components/instagram';
import Commitments from '../components/commitments';

const IndexPage = () => {
  return (
    <MainLayout>
      <SEO title="Accueil" />
      <Commitments />
      <Instagram />
      <Newsletter />
    </MainLayout>
  );
};

export default IndexPage;
