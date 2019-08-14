// Creating category page
const countCategories = categories.reduce((prev, curr) => {
  prev[curr] = (prev[curr] || 0) + 1;
  return prev;
}, {});

const allCategories = Object.keys(countCategories);
console.log(allCategories);

allCategories.forEach((cat, i) => {
  const link = `/blog/category/${kebabCase(cat)}`;

  Array.from({
    length: Math.ceil(countCategories[cat] / productPerPage),
  }).forEach((_, i) => {
    createPage({
      path: i === 0 ? link : `${link}/page/${i + 1}`,
      component: shopCategoryLayout,
      context: {
        allCategories: allCategories,
        category: cat,
        limit: productPerPage,
        skip: i * productPerPage,
        currentPage: i + 1,
        numPages: Math.ceil(countCategories[cat] / productPerPage),
      },
    });
  });
});
