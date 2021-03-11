import React from 'react';
import GlobalProvider from './src/components/globalStore.js';

export const wrapRootElement = ({ element }) => {
  return <GlobalProvider>{element}</GlobalProvider>;
};
/* global Snipcart:false */
export const onClientEntry = () => {
  window.onload = () => {
    //Making sure Snipcart is ready
    document.addEventListener('snipcart.ready', function () {
      console.info('snipcart is ready');
      //Subscribing to different events
      Snipcart.events.on('item.added', function (item) {
        console.log('item.added', item);
        itemAdded(item);
      });

      Snipcart.events.on('item.removed', function (item) {
        // console.log('item.removed', item);
        itemRemoved(item);
      });

      Snipcart.events.on('item.updated', (item) => {
        // console.log('item.updated', item);
        // itemUpdated(item);
      });

      Snipcart.events.on('cart.confirmed', function (cart) {
        // console.log('cart.confirmed', cart);
        orderCompleted(cart);
      });

      Snipcart.events.on('cart.created', function (cart) {
        // console.log('cart.created', cart);
        cartOpened(cart);
      });

      Snipcart.events.on('cart.reset', function (cart) {
        // console.log('cart.reset', cart);
        cartReset(cart);
      });

      Snipcart.events.on('theme.routechanged', function (routesChange) {
        // console.log('theme.routechanged', routesChange);
        pageChanged(routesChange);
      });
    });
  };
};

function createProductsFromItems(items) {
  return items.map(function (item) {
    return {
      name: item.name,
      description: item.description,
      id: item.id,
      price: item.price,
      quantity: item.quantity,
    };
  });
}

function itemAdded(item) {
  window.dataLayer.push({
    event: 'snipcartEvent',
    eventCategory: 'Cart Update',
    eventAction: 'New Item Added To Cart',
    eventLabel: item.name,
    eventValue: item.price,
    ecommerce: {
      add: {
        products: createProductsFromItems([item]),
      },
    },
  });
}

function itemRemoved(item) {
  window.dataLayer.push({
    event: 'snipcartEvent',
    eventCategory: 'Cart Update',
    eventAction: 'Item Removed From Cart',
    eventLabel: item.name,
    eventValue: item.price,
    ecommerce: {
      currencyCode: 'CAD',
      remove: {
        products: createProductsFromItems([item]),
      },
    },
  });
}

function orderCompleted(cart) {
  window.dataLayer.push({
    event: 'snipcartEvent',
    eventCategory: 'Order Update',
    eventAction: 'New Order Completed',
    ecommerce: {
      currencyCode: cart.currency,
      purchase: {
        actionField: {
          id: cart.token,
          affiliation: 'Website',
          revenue: cart.total,
          tax: cart.taxesTotal,
          shipping: cart.shippingInformation.fees,
          invoiceNumber: cart.invoiceNumber,
        },
        products: createProductsFromItems(cart.items),
        userId: cart.user.id,
      },
    },
  });
}

function cartOpened(cart) {
  window.dataLayer.push({
    event: 'snipcartEvent',
    eventCategory: 'Cart Action',
    eventAction: 'Cart Opened',
    ecommerce: {
      cartclose: {
        products: createProductsFromItems(cart.items),
      },
    },
  });
}

function cartReset(cart) {
  window.dataLayer.push({
    event: 'snipcartEvent',
    eventCategory: 'Cart Action',
    eventAction: 'Cart Reset',
    ecommerce: {
      cartopen: {
        products: createProductsFromItems(cart.items),
      },
    },
  });
}

function pageChanged(routesChange) {
  window.dataLayer.push({
    event: 'snipcartEvent',
    eventCategory: 'Page Change',
    eventAction: routesChange,
  });
}
