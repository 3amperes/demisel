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
        itemAdded(item);
      });

      Snipcart.events.on('item.removed', function (item) {
        itemRemoved(item);
      });

      Snipcart.events.on('order.completed', function (order) {
        orderCompleted(order);
      });

      Snipcart.events.on('cart.opened', function () {
        cartOpened();
      });

      Snipcart.events.on('cart.closed', function () {
        cartClosed();
      });

      Snipcart.events.on('page.change', function (page) {
        pageChanged(page);
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
      currencyCode: 'CAD',
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

function orderCompleted(order) {
  window.dataLayer.push({
    event: 'snipcartEvent',
    eventCategory: 'Order Update',
    eventAction: 'New Order Completed',
    ecommerce: {
      currencyCode: order.currency,
      purchase: {
        actionField: {
          id: order.token,
          affiliation: 'Website',
          revenue: order.total,
          tax: order.taxesTotal,
          shipping: order.shippingInformation.fees,
          invoiceNumber: order.invoiceNumber,
        },
        products: createProductsFromItems(order.items),
        userId: order.user.id,
      },
    },
  });
}

function cartOpened() {
  window.dataLayer.push({
    event: 'snipcartEvent',
    eventCategory: 'Cart Action',
    eventAction: 'Cart Opened',
    ecommerce: {
      cartclose: {
        products: createProductsFromItems(Snipcart.api.items.all()),
      },
    },
  });
}

function cartClosed() {
  window.dataLayer.push({
    event: 'snipcartEvent',
    eventCategory: 'Cart Action',
    eventAction: 'Cart Closed',
    ecommerce: {
      cartopen: {
        products: createProductsFromItems(Snipcart.api.items.all()),
      },
    },
  });
}

function pageChanged(page) {
  window.dataLayer.push({
    event: 'snipcartEvent',
    eventCategory: 'Page Change',
    eventAction: page,
    ecommerce: {
      checkout: {
        products: createProductsFromItems(Snipcart.api.items.all()),
      },
    },
  });
}
