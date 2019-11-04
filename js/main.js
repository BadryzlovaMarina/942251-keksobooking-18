'use strict';

var title = ['Заголовок 1', 'Заголовок 2', 'Заголовок 3', 'Заголовок 4', 'Заголовок 5', 'Заголовок 6', 'Заголовок 7', 'Заголовок 8'];
var price = [10000, 20000, 30000];
var type = ['palace', 'flat', 'house', 'bungalo'];
var typesRu = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalo: 'Бунгало'
};
var rooms = [2, 3, 4];
var guests = [2, 3, 4];
var checkIn = ['12:00', '13:00', '14:00'];
var checkOut = ['12:00', '13:00', '14:00'];
var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var photos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var advertCounts = 8;
var locations = {WIDTH: 65, MIN_X: 0, MAX_X: 1200, MIN_Y: 130, MAX_Y: 630};

var map = document.querySelector('.map');
map.classList.remove('map--faded');
var pinListElement = map.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');
var filterListElement = map.querySelector('.map__filters-container');
var cardTemplate = document.querySelector('#card')
    .content
    .querySelector('.map__card');

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

var createPin = function (pin) {
  var pinElement = pinTemplate.cloneNode(true);

  pinElement.style.left = pin.location.x + 'px';
  pinElement.style.top = pin.location.y + 'px';
  pinElement.querySelector('img').src = pin.author.avatar;
  pinElement.querySelector('img').alt = pin.offer.title;

  return pinElement;
};

var createFeature = function (feature) {
  var featureClass = '.popup__feature--' + feature;
  var featureTemplate = document.querySelector('#card').content.querySelector(featureClass);
  var element = featureTemplate.cloneNode();
  return element;
};

var createPhoto = function (photo) {
  var photoTemplate = document.querySelector('#card').content.querySelector('.popup__photos');
  var element = photoTemplate.cloneNode(true);
  element.querySelector('img').src = photo;
  return element;
};

var createList = function (element, list, offer) {
  var fragment = document.createDocumentFragment();
  element.innerHTML = '';
  for (var i = 0; i < list.length; i++) {
    var item = (offer === 'photos') ? createPhoto(list[i]) : createFeature(list[i]);
    fragment.appendChild(item);
  }
  element.appendChild(fragment);
};

var createCard = function (card) {
  var cardElement = cardTemplate.cloneNode(true);
  var featureElement = cardElement.querySelector('.popup__features');
  var featuresList = card.offer.features;
  var photoElement = cardElement.querySelector('.popup__photos');
  var photosList = card.offer.photos;
  cardElement.querySelector('.popup__title').textContent = card.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = card.location.x + ', ' + card.location.y;
  cardElement.querySelector('.popup__text--price').textContent = card.offer.price + '₽/ночь';
  cardElement.querySelector('.popup__type').textContent = typesRu[card.offer.type];
  cardElement.querySelector('.popup__text--capacity').textContent = card.offer.rooms + ' комнаты для ' + card.offer.guests + ' гостей';
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.offer.checkin + ', Выезд до ' + card.offer.checkout;
  cardElement.querySelector('.popup__description').textContent = card.offer.description;
  cardElement.querySelector('.popup__avatar').src = card.author.avatar;
  createList(featureElement, featuresList, 'features');
  createList(photoElement, photosList, 'photos');
  return cardElement;
};

var renderPin = function (pin) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < pin.length; i++) {
    fragment.appendChild(createPin(pin[i]));
  }
  pinListElement.appendChild(fragment);
};

var renderCard = function (card) {
  var fragment = createCard(card);
  map.insertBefore(fragment, filterListElement);
};

renderPin(adverts);
renderCard(adverts[0]);
