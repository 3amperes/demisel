import React from 'react';
import styled from 'styled-components';
import { MainLayout } from '@layouts';
import SEO from '@components/seo';
import { container } from '@utils/mixins';

const Wrapper = styled.div`
  ${container}
`;

const NotFoundPage = () => (
  <MainLayout>
    <SEO title="Merci" />

    <Wrapper>
      <h1>Merci !</h1>
      <p>Votre message a bien été envoyé, à très vite !</p>
    </Wrapper>
  </MainLayout>
);

export default NotFoundPage;
