import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import Image from 'gatsby-image';
import styled from 'styled-components';
import { Heading, Text, Box } from 'rebass/styled-components';
import { MainLayout } from '@layouts';
import { coloredSection } from '@utils/mixins';
import { colors } from '@theme';
import SEO from '@components/seo';
import Newsletter from '@components/newsletter';

const offset = 160;

const Header = styled.header`
  ${coloredSection('738px', '-15deg')};
`;

const Outlet = ({ name, city, url, ...rest }) => (
  <Box py=".5rem" {...rest}>
    <Heading fontSize="40px" lineHeight="48px" color="lipstick">
      {city}
    </Heading>
    <Text fontSize="14px" lineHeight="24px">
      {name}
      {url && <span>&nbsp;-&nbsp;</span>}
      {url && (
        <a
          href={url}
          style={{ color: colors.lipstick, textDecoration: 'none' }}
          target="_blank"
          rel="noopener noreferrer"
        >
          Voir le site
        </a>
      )}
    </Text>
  </Box>
);
const Country = ({ children, name, outlets, ...rest }) => (
  <Box py="40px" {...rest}>
    <Heading fontSize="16px" lineHeight="24px">
      {name}
    </Heading>
    {outlets.map(({ _key, ...props }) => (
      <Outlet key={_key} {...props} />
    ))}
  </Box>
);

const Countries = ({ items }) => (
  <Box maxWidth="700px" mx="auto" my={`${offset}px`} textAlign="center">
    {items.map(({ node: { name, outlets, id } }) => (
      <Country key={id} name={name} outlets={outlets} />
    ))}
  </Box>
);

export default () => (
  <StaticQuery
    query={graphql`
      query {
        introImage: file(relativePath: { eq: "outlets.jpg" }) {
          childImageSharp {
            fluid(maxWidth: 800) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        countries: allSanityCountry(sort: { fields: name }) {
          edges {
            node {
              id
              name
              outlets {
                _key
                name
                city
                url
              }
            }
          }
        }
      }
    `}
    render={data => {
      return (
        <MainLayout>
          <SEO title="Nos points de vente" />
          <Header>
            <Heading as="h1" fontSize={[32, 56]} lineHeight="1.2" mb="0.5em">
              Nos points de vente
            </Heading>
            <Text
              maxWidth="338px"
              mb={`${offset}px`}
              color="greyishBrown"
              fontSize={14}
              lineHeight="24px"
              textAlign="center"
            >
              Nous sommes là, mais nous sommes aussi ici et puis là-bas… en fait
              nos bijoux sont vendus un peu partout en France et même en Europe
              !
            </Text>
          </Header>
          <Box maxWidth="700px" mx="auto" mt={`-${offset}px`}>
            <Image fluid={data.introImage.childImageSharp.fluid} />
          </Box>
          <Countries items={data.countries.edges} />
          <Newsletter />
        </MainLayout>
      );
    }}
  />
);
