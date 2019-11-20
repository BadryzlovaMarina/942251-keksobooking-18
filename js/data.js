'use strict';

(function () {

  var Locations = {MIN_X: 0, MAX_X: 1200, MIN_Y: 130, MAX_Y: 630};
  var PinSizes = {WIDTH: 65, HEIGHT: 65};

  var HousingTypePrice = {
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

  var RoomCapacity = {
    1: [1],
    2: [1, 2],
    3: [1, 2, 3],
    100: [0]
  };

  var PriceValues = {
    low: {
      start: 0,
      end: 10000
    },

    middle: {
      start: 10000,
      end: 50000
    },

    high: {
      start: 50000,
      end: Infinity
    }
  };

  var map = document.querySelector('.map');

  window.data = {
    map: map,
    RoomCapacity: RoomCapacity,
    HousingTypePrice: HousingTypePrice,
    MIN_Y: Locations.MIN_Y,
    MAX_Y: Locations.MAX_Y,
    PIN_HEIGHT: PinSizes.HEIGHT,
    PriceValues: PriceValues
  };

})();
