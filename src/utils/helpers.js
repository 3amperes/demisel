export const getProductTitle = product => {
  const { title, model } = product;
  return (model && model.title) || title;
};
export const getPrice = (item, key) => {
  const { price, model } = item;
  switch (true) {
    case !!price && !!price[key]:
      return item.price[key];
    case !!model && !!model.price && !!model.price[key]:
      return item.model.price[key];
    default:
      return null;
  }
};
export const hasPrice = item => {
  const { price, model } = item;
  return (
    (!!price && !!price.salePrice) ||
    (!!model && !!model.price && !!model.price.salePrice)
  );
};
export const hasModel = item => {
  return item && item.model;
};

export const areEmptyFilters = filters => {
  return Array.from(filters.values()).every(value => value.size === 0);
};
