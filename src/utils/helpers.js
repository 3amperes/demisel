export const getProductTitle = product => {
  const { title, model } = product;
  return !!model ? model.title : title;
};
export const getPrice = (item, key) => {
  const { price, model } = item;
  return (price && price[key]) || (model && model.price && model.price[key]);
};
export const hasPrice = item => {
  const { price, model } = item;
  return (
    (price && price.salePrice) ||
    (model && model.price && model.price.salePrice)
  );
};

export const areEmptyFilters = filters => {
  return Array.from(filters.values()).every(value => value.size === 0);
};
