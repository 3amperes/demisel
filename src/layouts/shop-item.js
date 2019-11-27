import React from 'react';
import BlockContent from '@sanity/block-content-to-react';
import styled from 'styled-components';
import { up } from 'styled-breakpoints';
import { Box, Text, Heading } from 'rebass/styled-components';
import { graphql } from 'gatsby';
import Image from 'gatsby-image';
import MainLayout from './main';
import SEO from '@components/seo';
import { AddButton, Figure, Price } from '@components/product';

const Wrapper = styled.article`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 50% auto;

  .thumbnail {
    width: 315px;
  }
  .other-images {
    display: none;
  }

  ${up('tablet')} {
    grid-template-columns: 3fr 2fr;
    grid-template-areas: 'aside main';
    grid-template-rows: auto;
    grid-gap: 40px;
    .aside {
      grid-area: aside;
    }
    .main {
      grid-area: main;
    }
    .thumbnail {
      width: 515px;
    }
    .other-images {
      display: block;
    }
  }
`;

const Inner = styled(Box)`
  position: relative;
  ${up('tablet')} {
    max-width: 400px;
    position: sticky;
    top: 0;
  }
`;

const ButtonWrapper = styled(Box)`
  position: absolute;
  top: 0;
  right: 0;

  ${up('tablet')} {
    position: relative;
  }
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
        <aside className="aside">
          {thumbnail && (
            <Figure mb={0} py={[20, 80]}>
              <Image className="thumbnail" fluid={thumbnail.asset.fluid} />
            </Figure>
          )}
          {images &&
            images.length > 0 &&
            images.map((image, index) => {
              return (
                <Image
                  className="other-images"
                  key={index}
                  fluid={image.asset.fluid}
                />
              );
            })}
        </aside>
        <main className="main">
          <Inner px={[24, 40]} py={40}>
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
            <ButtonWrapper pt={40} pr={[20, 40]}>
              <AddButton product={data.sanityProduct} />
            </ButtonWrapper>
          </Inner>
        </main>
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
