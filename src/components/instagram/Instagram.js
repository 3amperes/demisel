import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import Image from 'gatsby-image';
import styled from 'styled-components';
import { Flex, Box, Heading } from 'rebass/styled-components';
import { container } from '@utils/mixins';

const Wrapper = styled(Flex)`
  width: 100%;
  height: 800px;
  align-items: center;
  flex-direction: column;
  padding: 140px 0;
`;

const Grid = styled(Box)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: 46px;
  ${container};
`;

export default props => (
  <StaticQuery
    query={graphql`
      query {
        allInstaNode {
          edges {
            node {
              id
              localFile {
                childImageSharp {
                  fixed(width: 328, height: 328) {
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
      const instaThumbs = data.allInstaNode.edges.slice(0, 3);
      return (
        <Wrapper {...props}>
          <Heading fontSize={[32, 48]} as="h2" mb="100px">
            Suivez-nous sur Instagram
          </Heading>
          <Grid>
            {instaThumbs.map(({ node }) => (
              <Image
                key={node.id}
                fixed={node.localFile.childImageSharp.fixed}
              />
            ))}
          </Grid>
        </Wrapper>
      );
    }}
  />
);
