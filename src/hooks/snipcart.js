import { useEffect } from 'react';
import { isAuthenticated } from '../utils/auth';
import { applyDiscountCode, cleanDiscountCode } from '../utils/cart';
import { DEALERCODE } from '../utils/constants';

export const useDealerDiscount = useEffect(() => {
  // mount
  window.Snipcart.api.cart.start().then(function(cart) {
    console.log(cart);
    if (isAuthenticated()) {
      applyDiscountCode(DEALERCODE);
    } else {
      cleanDiscountCode(DEALERCODE);
    }
  });
}, []);
