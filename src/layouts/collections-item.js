import React from 'react';
import styled from 'styled-components';
import { graphql } from 'gatsby';
import MainLayout from './main';
import SEO from '@components/seo';

const Wrapper = styled.article``;

const ProductDetail = ({ data }) => {
  const { title } = data.sanityCollection;
  return (
    <MainLayout>
      <SEO title={title} />
      <Wrapper>
        <main className="main">{title}</main>
      </Wrapper>
    </MainLayout>
  );
};

export default ProductDetail;

export const query = graphql`
  query($id: String) {
    sanityCollection(id: { eq: $id }) {
      id
      title
    }
  }
`;
