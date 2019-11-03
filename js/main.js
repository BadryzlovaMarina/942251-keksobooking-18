'use strict';

var title = ['Заголовок 1', 'Заголовок 2', 'Заголовок 3', 'Заголовок 4', 'Заголовок 5', 'Заголовок 6', 'Заголовок 7', 'Заголовок 8'];
var type = ['palace', 'flat', 'house', 'bungalo'];
var checkIn = ['12:00', '13:00', '14:00'];
var checkOut = ['12:00', '13:00', '14:00'];
var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var photos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var advertCounts = 8;
var locations = {WIDTH: 65, MIN_X: 0, MAX_X: 1200, MIN_Y: 130, MAX_Y: 630};

var map = document.querySelector('.map');
map.classList.remove('map--faded');

var similarListElement = map.querySelector('.map__pins');

var similarPinTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');

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
        price: 0,
        type: getRandomInt(type),
        rooms: 0,
        guests: 0,
        checkin: getRandomInt(checkIn),
        checkout: getRandomInt(checkOut),
        features: getRandomArray(features),
        description: '',
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

var renderPin = function (pin) {
  var pinElement = similarPinTemplate.cloneNode(true);

  pinElement.style.left = pin.location.x + 'px';
  pinElement.style.top = pin.location.y + 'px';
  pinElement.querySelector('img').src = pin.author.avatar;
  pinElement.querySelector('img').alt = pin.offer.title;

  return pinElement;
};

var displayPins = function (pin) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < pin.length; i++) {
    fragment.appendChild(renderPin(pin[i]));
  }
  similarListElement.appendChild(fragment);
};

displayPins(adverts);
