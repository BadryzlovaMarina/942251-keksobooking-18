'use strict';

(function () {

  var title = ['Заголовок 1', 'Заголовок 2', 'Заголовок 3', 'Заголовок 4', 'Заголовок 5', 'Заголовок 6', 'Заголовок 7', 'Заголовок 8'];
  var price = [10000, 20000, 30000];
  var type = ['palace', 'flat', 'house', 'bungalo'];
  var rooms = [1, 2, 3, 100];
  var guests = [0, 1, 2, 3];
  var checkIn = ['12:00', '13:00', '14:00'];
  var checkOut = ['12:00', '13:00', '14:00'];
  var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var photos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  var advertCounts = 8;
  var locations = {WIDTH: 65, MIN_X: 0, MAX_X: 1200, MIN_Y: 130, MAX_Y: 630};

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

  var getRandomInt = function (array) {
    return array[Math.floor(Math.random() * array.length)];
  };

  var getRandomArray = function (array) {
    var randomIndex = Math.floor(Math.random() * array.length + 1);
    return array.slice(0, randomIndex);
  };

  var getRandomIntInclusive = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  var getAvatarLink = function (index) {
    return 'img/avatars/user0' + (index + 1) + '.png';
  };

  var getAdvertsArray = function (adCount) {
    var adverts = [];
    for (var i = 0; i < adCount; i++) {
      adverts[i] = {
        author: {
          avatar: getAvatarLink(i)
        },
        offer: {
          title: getRandomInt(title),
          address: location.x + ', ' + location.y,
          price: getRandomInt(price),
          type: getRandomInt(type),
          rooms: getRandomInt(rooms),
          guests: getRandomInt(guests),
          checkin: getRandomInt(checkIn),
          checkout: getRandomInt(checkOut),
          features: getRandomArray(features),
          description: 'description',
          photos: getRandomArray(photos)
        },
        location: {
          x: getRandomIntInclusive(locations.MIN_X, locations.MAX_X - locations.WIDTH),
          y: getRandomIntInclusive(locations.MIN_Y, locations.MAX_Y),
        }
      };
    }
    return adverts;
  };

  var adverts = getAdvertsArray(advertCounts);

  window.data = {
    adverts: adverts,
    roomCapacity: roomCapacity,
    housingTypePrice: housingTypePrice,
    map: map
  };

})();
