'use strict';

(function () {

  var locations = {MIN_X: 0, MAX_X: 1200, MIN_Y: 130, MAX_Y: 630};
  var pinSizes = {WIDTH: 65, HEIGHT: 65};

  var housingTypePrice = {
    bungalo: {
      name: 'Бунгало',
      price: 0
    },

    flat: {
      name: 'Квартира',
      price: 1000
    },

    house: {
      name: 'Дом',
      price: 5000
    },

    palace: {
      name: 'Дворец',
      price: 10000
    }
  };

  var roomCapacity = {
    1: [1],
    2: [1, 2],
    3: [1, 2, 3],
    100: [0],
  };

  var map = document.querySelector('.map');

  window.data = {
    roomCapacity: roomCapacity,
    housingTypePrice: housingTypePrice,
    locations: locations,
    map: map,
    MIN_Y: locations.MIN_Y,
    MAX_Y: locations.MAX_Y,
    PIN_HEIGHT: pinSizes.HEIGHT
  };

})();
