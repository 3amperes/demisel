import React, { useState } from 'react';
import styled from 'styled-components';
import { StaticQuery, graphql } from 'gatsby';
import { Box } from 'rebass/styled-components';
import Item from './Item';

const Wrapper = styled(Box)`
  width: 100%;
  min-height: 400px;
  position: relative;
  transition: all 250ms ease-in-out;
`;
export default props => {
  const [currentIndex, setCurrentIndex] = useState(0);
  return (
    <StaticQuery
      query={graphql`
        query {
          image1: file(relativePath: { eq: "slider.jpg" }) {
            childImageSharp {
              fluid(maxWidth: 1200) {
                ...GatsbyImageSharpFluid
              }
            }
          }
          image2: file(relativePath: { eq: "slider2.jpg" }) {
            childImageSharp {
              fluid(maxWidth: 1200) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      `}
      render={data => {
        return (
          <>
            <Wrapper>
              <Item
                fluid={data.image1.childImageSharp.fluid}
                isCurrent={currentIndex === 0}
              />
              <Item
                fluid={data.image2.childImageSharp.fluid}
                isCurrent={currentIndex === 1}
              />
            </Wrapper>
            <button onClick={() => setCurrentIndex(currentIndex === 0 ? 1 : 0)}>
              next
            </button>
          </>
        );
      }}
    />
  );
};
