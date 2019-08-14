import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import SEO from '../components/seo';
import Image from 'gatsby-image';
import { AddButton } from '../components/product';

const ProductDetail = ({ data }) => {
  const { title, model, thumbnail } = data.sanityProduct;
  const productTitle = model ? `${model.title} • ${title}` : title;

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
    <Layout>
      <SEO title={productTitle} />
      <article>{renderHeader()}</article>
      {thumbnail && (
        <div style={{ width: 400 }}>
          <Image fluid={thumbnail.asset.fluid} />
        </div>
      )}
      détail du produit <br />
      <AddButton product={data.sanityProduct} />
    </Layout>
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
