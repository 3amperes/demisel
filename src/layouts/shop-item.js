import React from 'react';
import BlockContent from '@sanity/block-content-to-react';
import styled from 'styled-components';
import { Box, Text, Heading } from 'rebass/styled-components';
import { graphql } from 'gatsby';
import Image from 'gatsby-image';
import MainLayout from './main';
import SEO from '@components/seo';
import { AddButton, Figure, Price } from '@components/product';

const Wrapper = styled.article`
  display: grid;
  grid-template-columns: 3fr 2fr;
  grid-template-rows: auto;
  grid-template-areas: 'aside main';
  border-top: 4px solid rgba(0, 0, 0, 0.16);
  grid-gap: 40px;

  .aside {
    grid-area: aside;
  }
  .main {
    grid-area: main;
  }
`;

const Inner = styled.div`
  padding: 40px;
  max-width: 400px;
  position: sticky;
  top: 0;
`;

const Title = ({ children }) => (
  <Heading fontSize={[24, 32]} as="h1" mb="0.5rem">
    {children}
  </Heading>
);

const DefinitionTitle = ({ children }) => (
  <Text color="warmGrey" fontSize={[12]} mt="1.5rem" mb="0.5rem">
    {children}
  </Text>
);

const Header = ({ item }) => {
  const { title, model, price } = item;
  if (!title) return;
  return (
    <header>
      <Title>{model && model.title ? model.title : title}</Title>
      <Price item={{ model, price }} />
      {model && model.title && (
        <>
          <DefinitionTitle>Couleurs</DefinitionTitle>
          <Text>{title}</Text>
        </>
      )}
    </header>
  );
};

const ProductDetail = ({ data }) => {
  const { title, model, thumbnail, price } = data.sanityProduct;
  const productTitle = model ? `${model.title} • ${title}` : title;
  const body = model && model._rawDescription;
  const images = model && model.images;
  const specification = model && model.specification;
  return (
    <MainLayout>
      <SEO title={productTitle} />
      <Wrapper>
        <main className="main">
          <Inner>
            <Header
              item={{
                title,
                price,
                model: { title: model.title, price: model.price },
              }}
            />
            <DefinitionTitle>Description</DefinitionTitle>
            <BlockContent blocks={body} />
            {specification && (
              <Text
                as="footer"
                color="warmGrey"
                fontSize={1}
                style={{ fontStyle: 'italic' }}
              >
                {specification}
              </Text>
            )}
            <Box pt="50px">
              <AddButton product={data.sanityProduct} />
            </Box>
          </Inner>
        </main>
        <aside className="images">
          {thumbnail && (
            <Figure mb={0}>
              <div style={{ width: 700 }}>
                <Image fluid={thumbnail.asset.fluid} />
              </div>
            </Figure>
          )}
          {images &&
            images.length > 0 &&
            images.map((image, index) => {
              return <Image key={index} fluid={image.asset.fluid} />;
            })}
        </aside>
      </Wrapper>
    </MainLayout>
  );
};

export default ProductDetail;

export const query = graphql`
  query($id: String) {
    sanityProduct(id: { eq: $id }) {
      id
      title
      model {
        title
        _rawDescription
        specification
        images {
          asset {
            fluid(maxWidth: 700) {
              ...GatsbySanityImageFluid
            }
          }
        }
        price {
          salePrice
        }
      }
      price {
        salePrice
      }
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
`;
