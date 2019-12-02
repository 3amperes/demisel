const path = require(`path`);

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const shopListLayout = path.resolve(`./src/layouts/shop-list.js`);
  const shopCategoryLayout = path.resolve(`./src/layouts/shop-category.js`);
  const shopProductLayout = path.resolve(`./src/layouts/shop-item.js`);
  const collectionsListLayout = path.resolve(
    `./src/layouts/collections-list.js`
  );
  const collectionsItemLayout = path.resolve(
    `./src/layouts/collections-item.js`
  );

  const result = await graphql(`
    {
      products: allSanityProduct(
        sort: { order: DESC, fields: _updatedAt }
        limit: 2000
      ) {
        edges {
          node {
            id
          }
        }
        group(field: category___slug___current) {
          totalCount
          fieldValue
        }
        totalCount
      }
      collections: allSanityCollection(
        sort: { order: DESC, fields: _updatedAt }
        limit: 2000
      ) {
        edges {
          node {
            id
            slug {
              current
            }
          }
        }
      }
    }
  `);

  /* Iterate needed pages and create them. */
  const products = result.data.products.edges;
  const categories = result.data.products.group;
  const collections = result.data.collections.edges;

  /* Combine all data needed to construct this page. */
  createPage({
    path: `/shop`,
    component: shopListLayout,
    context: {
      /* If you need to pass additional data, you can pass it inside this context object. */
      products,
    },
  });

  // Creating categories
  categories.forEach((category, index, arr) => {
    const prev = arr[index - 1];
    const next = arr[index + 1];

    const categoryData = {
      path: `/shop/category/${category.fieldValue}`,
      component: shopCategoryLayout,
      context: {
        slug: category.fieldValue,
        totalCount: category.totalCount,
        prev: prev,
        next: next,
      },
    };
    createPage(categoryData);
  });

  // Creating shop products
  products.forEach((product, index, arr) => {
    const prev = arr[index - 1];
    const next = arr[index + 1];

    const productData = {
      path: `/product/${product.node.id}`,
      component: shopProductLayout,
      context: {
        id: product.node.id,
        prev: prev,
        next: next,
      },
    };

    createPage(productData);
  });

  /* Combine all data needed to construct this page. */
  createPage({
    path: `/collections`,
    component: collectionsListLayout,
    context: {
      /* If you need to pass additional data, you can pass it inside this context object. */
      collections,
    },
  });

  // Creating shop products
  collections.forEach((collection, index, arr) => {
    const prev = arr[index - 1];
    const next = arr[index + 1];

    const collectionData = {
      path: `/collections/${collection.node.slug.current}`,
      component: collectionsItemLayout,
      context: {
        id: collection.node.id,
        slug: collection.node.slug.current,
        prev: prev,
        next: next,
      },
    };

    createPage(collectionData);
  });
};

exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  if (stage === 'build-html') {
    /*
     * During the build step, `auth0-js` will break because it relies on
     * browser-specific APIs. Fortunately, we don’t need it during the build.
     * Using Webpack’s null loader, we’re able to effectively ignore `auth0-js`
     * during the build. (See `src/utils/auth.js` to see how we prevent this
     * from breaking the app.)
     */
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /auth0-js/,
            use: loaders.null(),
          },
        ],
      },
    });
  }
};

// Pagination version

// function createJSON(pageData) {
//   const pathSuffix = pageData.path.replace(
//     /[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi,
//     ''
//   );
//   const dir = 'public/paginationJson/';
//   if (!fs.existsSync(dir)) {
//     fs.mkdirSync(dir);
//   }
//   const filePath = dir + 'index' + pathSuffix + '.json';
//   const dataToSave = JSON.stringify(pageData.context.pageProducts);
//   fs.writeFile(filePath, dataToSave, function(err) {
//     if (err) {
//       return console.log(err, pageData.path);
//     }
//   });
// }

// const countProductsPerPage = 3;
// const countPages = Math.ceil(products.length / countProductsPerPage);

// for (var currentPage = 1; currentPage <= countPages; currentPage++) {
//   const pathSuffix =
//     currentPage > 1
//       ? currentPage
//       : ''; /* To create paths "/", "/2", "/3", ... */

//   /* Collect images needed for this page. */
//   const startIndexInclusive = countProductsPerPage * (currentPage - 1);
//   const endIndexExclusive = startIndexInclusive + countProductsPerPage;
//   const pageProducts = products.slice(startIndexInclusive, endIndexExclusive);

//   /* Combine all data needed to construct this page. */
//   const pageData = {
//     path: `/shop/${pathSuffix}`,
//     component: shopListLayout,
//     context: {
//       /* If you need to pass additional data, you can pass it inside this context object. */
//       pageProducts: pageProducts,
//       currentPage: currentPage,
//       countPages: countPages,
//     },
//   };

//   /* Create normal pages (for pagination) and corresponding JSON (for infinite scroll). */
//   createJSON(pageData);
//   createPage(pageData);
// }
