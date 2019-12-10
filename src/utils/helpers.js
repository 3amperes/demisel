export const getProductTitle = product => {
  const { title, model, category } = product;
  const productTitle = (model && model.title) || title;
  return `${category.shortName} ${productTitle}`;
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

export function scrollToTop() {
  let scrollAnimation;
  const position =
    document.body.scrollTop || document.documentElement.scrollTop;
  if (position) {
    window.scrollBy(0, -Math.max(1, Math.floor(position / 10)));
    scrollAnimation = setTimeout(scrollToTop, 30);
  } else clearTimeout(scrollAnimation);
}

export const browser = () => (typeof window !== 'undefined' ? window : null);
