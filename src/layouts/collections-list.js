import React from 'react';
import { graphql, Link } from 'gatsby';
import MainLayout from './main';

import SEO from '@components/seo';

const Collections = ({ data }) => {
  const collections = data.allSanityCollection.edges;

  console.log(collections);

  return (
    <MainLayout>
      <SEO title="Collections" />
      <p>ici les collections</p>
      <ol>
        {collections.map(({ node: item }) => (
          <li key={item.id}>
            <Link to={`/collections/${item.id}`}>{item.title}</Link>
          </li>
        ))}
      </ol>
    </MainLayout>
  );
};

export default Collections;

export const query = graphql`
  query {
    allSanityCollection {
      edges {
        node {
          id
          title
        }
      }
    }
  }
`;
