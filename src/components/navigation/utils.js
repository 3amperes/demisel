export const getOtherLinks = areDiscountsAvailable => {
  const result = [];
  if (areDiscountsAvailable) {
    result.push({
      id: 'discounts',
      title: 'Les soldes',
      link: '/shop?discount=true',
    });
  }
  return result;
};
