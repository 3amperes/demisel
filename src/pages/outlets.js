import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';
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

const Image = () => (
  <StaticQuery
    query={graphql`
      query {
        placeholderImage: file(relativePath: { eq: "outlets.jpg" }) {
          childImageSharp {
            fluid(maxWidth: 800) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    `}
    render={data => <Img fluid={data.placeholderImage.childImageSharp.fluid} />}
  />
);

const Outlet = ({ name, city, url }) => (
  <Box py=".5rem">
    <Heading fontSize="40px" lineHeight="48px" color="lipstick">
      {name}
    </Heading>
    <Text fontSize="14px" lineHeight="24px">
      {city}&nbsp;-&nbsp;
      <a href={url} style={{ color: colors.lipstick, textDecoration: 'none' }}>
        Voir le site
      </a>
    </Text>
  </Box>
);
const Country = ({ children, name, outlets, ...rest }) => (
  <Box py="40px" {...rest}>
    <Heading fontSize="16px" lineHeight="24px">
      {name}
    </Heading>
    {outlets.map(({ ...props }, index) => (
      <Outlet key={index} {...props} />
    ))}
  </Box>
);

const outlets = [
  {
    name: 'Yuman Village',
    city: 'Bruxelles',
    url: 'http://demiselbijoux.com',
  },
  {
    name: 'Yuman Village',
    city: 'Bruxelles',
    url: 'http://demiselbijoux.com',
  },
  {
    name: 'Yuman Village',
    city: 'Bruxelles',
    url: 'http://demiselbijoux.com',
  },
  {
    name: 'Yuman Village',
    city: 'Bruxelles',
    url: 'http://demiselbijoux.com',
  },
  {
    name: 'Yuman Village',
    city: 'Bruxelles',
    url: 'http://demiselbijoux.com',
  },
];

const Outlets = () => (
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
        Nous sommes là, mais nous sommes aussi ici et puis là-bas… en fait nos
        bijoux sont vendus un peu partout en France et même en Europe !
      </Text>
    </Header>
    <Box maxWidth="700px" mx="auto" mt={`-${offset}px`}>
      <Image />
    </Box>
    <Box maxWidth="700px" mx="auto" mt={`${offset}px`} textAlign="center">
      <Country name="Belgique" outlets={outlets} />
    </Box>
    <Newsletter />
  </MainLayout>
);

export default Outlets;
