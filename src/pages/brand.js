import React from 'react';
import { StaticQuery, graphql, Link } from 'gatsby';
import Image from 'gatsby-image';
import styled from 'styled-components';
import { Heading, Text, Box, Flex } from 'rebass/styled-components';
import { MainLayout } from '@layouts';
import { coloredSection, link } from '@utils/mixins';
import { colors } from '@theme';
import SEO from '@components/seo';
import Newsletter from '@components/newsletter';

const offset = 160;

const Header = styled.header`
  ${coloredSection('738px', '-15deg')};
`;

const Section = styled(Flex)`
  a {
    ${link(colors.lipstick)}
  }
`;

Section.defaultProps = {
  py: [20, 40],
  px: [20, 0],
  justifyContent: 'center',
  alignItems: 'center',
  flexWrap: 'wrap',
  textAlign: ['center', 'left'],
};

const SectionTitle = ({ children, ...rest }) => (
  <Heading
    as="h2"
    fontSize={[28, 40]}
    lineHeight="1.2"
    mb="1em"
    maxWidth="500px"
    pt={[20, 0]}
    {...rest}
  >
    {children}
  </Heading>
);
const Blockquote = ({ children, ...rest }) => (
  <Heading
    as="blockquote"
    fontSize={[24, 32]}
    color="lipstick"
    lineHeight="1.2"
    mb="1em"
    maxWidth="420px"
    mx={['auto', 0]}
    pt={[20, 0]}
    {...rest}
  >
    {children}
  </Heading>
);

const SectionParagraph = ({ children, ...rest }) => (
  <Text
    maxWidth="338px"
    fontSize={14}
    lineHeight="24px"
    mb={[20, 40]}
    mx={['auto', 0]}
    as="p"
    {...rest}
  >
    {children}
  </Text>
);

export default () => {
  return (
    <StaticQuery
      query={graphql`
        query {
          introImage: file(relativePath: { eq: "brand-intro.jpg" }) {
            childImageSharp {
              fluid(maxWidth: 1200) {
                ...GatsbyImageSharpFluid
              }
            }
          }
          image1: file(relativePath: { eq: "brand-1.jpg" }) {
            childImageSharp {
              fluid(maxWidth: 1200) {
                ...GatsbyImageSharpFluid
              }
            }
          }
          image2: file(relativePath: { eq: "brand-2.jpg" }) {
            childImageSharp {
              fluid(maxWidth: 1200) {
                ...GatsbyImageSharpFluid
              }
            }
          }
          image3: file(relativePath: { eq: "brand-3.jpg" }) {
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
          <MainLayout>
            <SEO title="La marque" />
            <Header>
              <Heading as="h1" fontSize={[32, 56]} lineHeight="1.2" mb="0.5em">
                La marque
              </Heading>
              <Text
                maxWidth="338px"
                mb={`${offset}px`}
                color="greyishBrown"
                fontSize={14}
                lineHeight="24px"
                textAlign="center"
              >
                Sabrina Lemaréchal crée la marque de bijoux et accessoires
                Demisel en 2009 par passion pour la conception de bijoux et la
                recherche de matériaux, de formes et de couleurs.
              </Text>
            </Header>
            <Box maxWidth="700px" mx="auto" mt={`-${offset}px`}>
              <Image fluid={data.introImage.childImageSharp.fluid} />
            </Box>
            <Section>
              <div>
                <SectionTitle textAlign="center">
                  De dentiste à créatrice
                </SectionTitle>
                <SectionParagraph mx="auto" textAlign="center">
                  Dentiste de formation, elle décide de raccrocher la blouse en
                  2016 pour se consacrer pleinement à sa passion et développer
                  la marque, qui compte aujourd’hui plus de 50 points de vente.
                </SectionParagraph>
              </div>
            </Section>
            <Section>
              <Box width={[1, 1 / 2]}>
                <Box width={[1, 2 / 3]}>
                  <Image fluid={data.image1.childImageSharp.fluid} />
                </Box>
              </Box>
              <Box width={[1, 1 / 2]}>
                <Blockquote style={{ position: 'relative' }}>
                  <div
                    style={{
                      fontSize: '300px',
                      opacity: 0.2,
                      position: 'absolute',
                      top: '-140px',
                    }}
                  >
                    “
                  </div>
                  Au début, je chinais des vestes mais les coloris n’étaient pas
                  aussi fous qu’aujourd’hui.
                </Blockquote>
                <SectionParagraph>
                  Impliquée personnellement dans la démarche « zéro déchet »,
                  elle se lance dans la création de pièces fabriquées à partir
                  de chutes de cuir issues de maisons de luxe et de peaux
                  déclassées, qu’elle cherche à revaloriser. Ce qui inscrit la
                  marque dans la tendance écologique appelée « upcycling »
                </SectionParagraph>
              </Box>
            </Section>
            <Section>
              <Box width={[1, 1 / 2]} order={[0, 2]}>
                <Image fluid={data.image2.childImageSharp.fluid} />
              </Box>
              <Box width={[1, 1 / 2]}>
                <Box pl={[0, '10%', '15%', '25%']} pr="1rem">
                  <SectionTitle>
                    Le développement de <br /> Demisel continue
                  </SectionTitle>
                  <SectionParagraph>
                    Passionnée et curieuse de découvrir de nouvelles matières,
                    elle lance, cette année, une gamme entièrement Vegan,
                    élaborée à partir de chutes de cuir d’ananas. La marque
                    s’inscrit autant que possible dans une démarche écologique,
                    en réfléchissant en permanence à limiter l’utilisation de
                    plastique et l’impact écologique à l’atelier. Les bijoux
                    sont présentés sur une carte et glissés dans une pochette
                    papier. L’attitude « green » et éco-consciente est devenu
                    l’ADN de Demisel.
                  </SectionParagraph>
                  <Link to="/shop/?collections=07ed857b-9de7-52a3-aa71-b48f9b350998">
                    Découvrir le cuir végétal
                  </Link>
                </Box>
              </Box>
            </Section>
            <Section>
              <Box width={[1, 1 / 3]} mr="auto">
                <Image fluid={data.image3.childImageSharp.fluid} />
              </Box>
              <Box width={[1, 1 / 2]}>
                <SectionTitle>Des bijoux uniques</SectionTitle>
                <SectionParagraph>
                  Optimiste comme sa créatrice, la collection de bijoux jongle
                  entre coloris tendances et lignes graphiques. Les bijoux hyper
                  légers ajoutent du pep’s à toutes les tenues.
                </SectionParagraph>
                <SectionParagraph>
                  Tous les bijoux sont imaginés, créés et conçus à l’atelier
                  Demisel en centre-ville de Rennes. Chaque bijou est fabriqué à
                  la main, il est donc unique.
                </SectionParagraph>
                <Link to="/shop">Voir les bijoux</Link>
              </Box>
            </Section>
            <Section py={[20, 80]}>
              <Box textAlign="center">
                <SectionTitle>
                  Une question ? <br />
                  Besoin d’un renseignement ?
                </SectionTitle>
                <Link to="/contact">Nous contacter</Link>
              </Box>
            </Section>
            <Newsletter />
          </MainLayout>
        );
      }}
    />
  );
};
