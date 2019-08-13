export const getProductTitle = product => {
  const { title, model } = product;
  return model ? model.title : title;
};
export const getPrice = (item, key) => {
  const { price, model } = item;
  return (price && price[key]) || (model.price && model.price[key]);
};
export const hasPrice = item => {
  const { price, model } = item;
  return (price && price.salePrice) || (model.price && model.price.salePrice);
};
