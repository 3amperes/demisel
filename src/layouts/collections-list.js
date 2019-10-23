import React from 'react';
import { graphql, Link } from 'gatsby';
import Image from 'gatsby-image';
import MainLayout from './main';

import SEO from '@components/seo';
import { Figure } from '@components/product';

const Collections = ({ data }) => {
  const collections = data.allSanityCollection.edges;

  return (
    <MainLayout>
      <SEO title="Collections" />
      <p>ici les collections</p>
      <ol>
        {collections.map(({ node: item }) => (
          <li key={item.id}>
            <Link to={`/collections/${item.id}`}>
              {item.thumbnail && (
                <Figure mb={0}>
                  <div style={{ width: 700 }}>
                    <Image fluid={item.thumbnail.asset.fluid} />
                  </div>
                </Figure>
              )}
              {item.title}
            </Link>
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
          thumbnail {
            alt
            asset {
              fluid(maxWidth: 700) {
                ...GatsbySanityImageFluid
              }
            }
          }
        }
      }
    }
  }
`;
