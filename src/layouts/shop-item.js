import React from 'react';
import BlockContent from '@sanity/block-content-to-react';
import styled from 'styled-components';
import { Box } from 'rebass';
import { graphql } from 'gatsby';
import MainLayout from './main';
import SEO from '../components/seo';
import Image from 'gatsby-image';
import { AddButton, Figure } from '../components/product';

const Wrapper = styled.article`
  display: grid;
  grid-template-columns: 3fr 2fr;
  grid-template-rows: 100vh;
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
`;

const ProductDetail = ({ data }) => {
  const { title, model, thumbnail } = data.sanityProduct;
  const productTitle = model ? `${model.title} • ${title}` : title;
  const body = model && model._rawDescription;
  const specification = model && model.specification;

  const renderHeader = () => {
    return model ? (
      <header>
        <h1>{model.title}</h1>
        <h2>{title}</h2>
      </header>
    ) : (
      <header>
        <h1>{title}</h1>
      </header>
    );
  };
  return (
    <MainLayout>
      <SEO title={productTitle} />
      <Wrapper>
        <main className="main">
          <Inner>
            <header className="header">{renderHeader()}</header>
            <BlockContent blocks={body} />
            {specification && <footer>{specification}</footer>}
            <Box pt="50px">
              <AddButton product={data.sanityProduct} />
            </Box>
          </Inner>
        </main>
        <aside className="images">
          {thumbnail && (
            <Figure>
              <div style={{ width: 500 }}>
                <Image fluid={thumbnail.asset.fluid} />
              </div>
            </Figure>
          )}
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
