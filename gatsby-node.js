/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

// Implement the Gatsby API “onCreatePage”. This is
// called after every page is created.
// exports.onCreatePage = async ({ page, actions }) => {
//   const { createPage } = actions;

//   // page.matchPath is a special key that's used for matching pages
//   // only on the client.
//   if (page.path.match(/^\/account/)) {
//     page.matchPath = "/account/*";

//     // Update the page.
//     createPage(page);
//   }
// };

const path = require(`path`);
const fs = require('fs');
const kebabCase = require(`lodash.kebabcase`);

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const shopListLayout = path.resolve(`./src/layouts/shop/list.js`);
  const shopProductLayout = path.resolve(`./src/layouts/shop/item.js`);

  const result = await graphql(`
    {
      allSanityProduct(sort: { fields: _createdAt, order: DESC }) {
        edges {
          node {
            id
          }
        }
      }
    }
  `);

  /* Iterate needed pages and create them. */
  const products = result.data.allSanityProduct.edges;
  const countProductsPerPage = 3;
  const countPages = Math.ceil(products.length / countProductsPerPage);

  for (var currentPage = 1; currentPage <= countPages; currentPage++) {
    const pathSuffix =
      currentPage > 1
        ? currentPage
        : ''; /* To create paths "/", "/2", "/3", ... */

    /* Collect images needed for this page. */
    const startIndexInclusive = countProductsPerPage * (currentPage - 1);
    const endIndexExclusive = startIndexInclusive + countProductsPerPage;
    const pageProducts = products.slice(startIndexInclusive, endIndexExclusive);

    /* Combine all data needed to construct this page. */
    const pageData = {
      path: `/shop/${pathSuffix}`,
      component: shopListLayout,
      context: {
        /* If you need to pass additional data, you can pass it inside this context object. */
        pageProducts: pageProducts,
        currentPage: currentPage,
        countPages: countPages,
      },
    };

    /* Create normal pages (for pagination) and corresponding JSON (for infinite scroll). */
    createJSON(pageData);
    createPage(pageData);
  }
  console.log(`\nCreated ${countPages} pages of paginated content.`);

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

function createJSON(pageData) {
  const pathSuffix = pageData.path.replace(
    /[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi,
    ''
  );
  const dir = 'public/paginationJson/';
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
  const filePath = dir + 'index' + pathSuffix + '.json';
  const dataToSave = JSON.stringify(pageData.context.pageProducts);
  fs.writeFile(filePath, dataToSave, function(err) {
    if (err) {
      return console.log(err, pageData.path);
    }
  });
}
