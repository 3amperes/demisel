import React from 'react';
import { Link } from 'gatsby';
import Image from 'gatsby-image';
import styled from 'styled-components';
import { Box, Heading, Text, Flex } from 'rebass/styled-components';
import { up } from 'styled-breakpoints';
import Go from '@components/go';
import { colors } from '@theme';
import { container, link } from '@utils/mixins';

const PushesWrapper = styled.section`
  ${container};
  background-color: ${colors.white};
  ${up('desktop')} {
    padding: 120px 0;
    columns: ${props => props.columns};
    column-gap: 40px;
  }

  a {
    display: block;
    break-inside: avoid;
    cursor: pointer;
  }

  header,
  footer {
    margin-bottom: 40px;
  }

  footer {
    a {
      ${link(colors.lipstick)};
    }
  }

  .pushes-item {
    display: block;
    position: relative;
    margin-bottom: 40px;
    overflow: hidden;

    &:after {
      content: '';
      display: block;
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      background: linear-gradient(
        to top,
        rgba(0, 0, 0, 0.85) 0%,
        rgba(84, 84, 84, 0) 50%
      );
    }

    .gatsby-image-wrapper,
    .pushes-title-arrow {
      transition: all 250ms ease-in-out;
    }

    &:hover {
      .gatsby-image-wrapper {
        transform: scale(1.1);
      }
      .pushes-title-arrow {
        transform: translateX(-1em);
      }
    }
    &-title {
      position: absolute;
      width: 100%;
      bottom: 0;
      padding: 2rem;
      color: ${colors.white};
      z-index: 2;
      align-items: center;
    }
  }
`;

export default ({ pushes }) => {
  const { title, introduction, items } = pushes;
  return (
    <PushesWrapper columns={2}>
      {(introduction || title) && (
        <Box
          as="header"
          py="2rem"
          className="pushes-introduction"
          maxWidth="380px"
        >
          {title && (
            <Heading fontSize={[32, 48]} lineHeight="1.2" as="h2" mb="2rem">
              {title}
            </Heading>
          )}
          {introduction && <Text>{introduction}</Text>}
        </Box>
      )}
      {items.length > 0 &&
        items.map(item => {
          return (
            <a href={item.link} key={item.title} className="pushes-item">
              <Flex className="pushes-item-title">
                <Heading fontSize={[24]} as="h3" mr="auto">
                  {item.title}
                </Heading>
                <Go className="pushes-title-arrow" />
              </Flex>
              <Image fluid={item.thumbnail.asset.fluid} />
            </a>
          );
        })}
      <Box as="footer" textAlign="center" className="pushes-footer">
        <Heading fontSize={[32, 48]} lineHeight="1.2" as="h2" mb="1rem">
          Découvrez <br /> tous nos bijoux
        </Heading>
        <Box mt="1rem">
          <Link to="/shop">Accédez à l'E-shop</Link>
        </Box>
      </Box>
    </PushesWrapper>
  );
};
