export const applyDiscountCode = code => {
  window.Snipcart.api.discounts
    .applyDiscountCode(code)
    .then(function(appliedCode) {
      console.log(appliedCode);
    })
    .fail(function(error) {
      console.log(
        "Something went wrong when adding the discount code, are you sure it's a valid code?",
        error
      );
    });
};
export const cleanDiscountCode = code => {
  const allDiscounts = window.Snipcart.api.discounts.all();
  if (allDiscounts.length > 0) {
    const codeToClean = allDiscounts.find(discount => discount.code === code);
    if (codeToClean !== undefined || codeToClean !== null || !!codeToClean.id) {
      window.Snipcart.api.discounts
        .remove(codeToClean.id)
        .then(function(discount) {
          console.log('The discount has been removed', discount);
        })
        .fail(function(error) {
          console.log('Something went wrong when removing the discount', error);
        });
    }
  }
};
