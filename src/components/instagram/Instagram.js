import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import Image from 'gatsby-image';
import styled from 'styled-components';
import { up } from 'styled-breakpoints';
import { Flex, Box, Heading } from 'rebass/styled-components';

const Wrapper = styled(Flex)`
  width: 100%;
  align-items: center;
  flex-direction: column;
  padding: 2rem;

  ${up('desktop')} {
    padding: 140px 0;
    height: 800px;
  }
`;

const Grid = styled(Box)`
  display: grid;
  grid-gap: 46px;
  ${up('desktop')} {
    grid-template-columns: repeat(3, 320px);
  }

  a {
    display: block;
    max-width: 100%;
  }
`;

export default props => (
  <StaticQuery
    query={graphql`
      query {
        images: allInstaNode(sort: { order: DESC, fields: timestamp }) {
          edges {
            node {
              id
              localFile {
                childImageSharp {
                  fixed(width: 640, height: 640) {
                    ...GatsbyImageSharpFixed
                  }
                }
              }
            }
          }
        }
      }
    `}
    render={data => {
      const instaThumbs = data.images.edges.slice(0, 3);
      return (
        <Wrapper {...props}>
          <Heading
            fontSize={[32, 48]}
            as="h2"
            mb={[40, 100]}
            textAlign="center"
          >
            Suivez-nous sur Instagram
          </Heading>
          <Grid>
            {instaThumbs.map(({ node }) => (
              <a
                href="https://www.instagram.com/demiselbijoux"
                key={node.id}
                target="_blank"
              >
                <Image
                  style={{ width: '320px', height: '320px' }}
                  fixed={node.localFile.childImageSharp.fixed}
                />
              </a>
            ))}
          </Grid>
        </Wrapper>
      );
    }}
  />
);
