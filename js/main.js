'use strict';

var ENTER_KEYCODE = 13;
var title = ['Заголовок 1', 'Заголовок 2', 'Заголовок 3', 'Заголовок 4', 'Заголовок 5', 'Заголовок 6', 'Заголовок 7', 'Заголовок 8'];
var price = [10000, 20000, 30000];
var type = ['palace', 'flat', 'house', 'bungalo'];
var typesRu = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalo: 'Бунгало'
};
var rooms = [1, 2, 3, 100];
var guests = [0, 1, 2, 3];
var checkIn = ['12:00', '13:00', '14:00'];
var checkOut = ['12:00', '13:00', '14:00'];
var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var photos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var advertCounts = 8;
var locations = {WIDTH: 65, MIN_X: 0, MAX_X: 1200, MIN_Y: 130, MAX_Y: 630};

var map = document.querySelector('.map');
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

var mapPin = document.querySelector('.map__pin--main');
var adForm = document.querySelector('.ad-form');
var mapFilter = document.querySelector('.map__filters');
var adFormAddress = adForm.querySelector('#address');
var activeMode = false;

map.classList.add('map--faded');

var disableElement = function (element) {
  var elements = document.querySelectorAll(element);
  for (var i = 0; i < elements.length; i++) {
    elements[i].setAttribute('disabled', 'disabled');
  }
};

disableElement('select');
disableElement('fieldset');


var enableElement = function (element) {
  var elements = document.querySelectorAll(element);
  for (var i = 0; i < elements.length; i++) {
    elements[i].removeAttribute('disabled');
  }
};

var activateMap = function () {
  map.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');
  mapFilter.classList.remove('map__filters--disabled');
  enableElement('select');
  enableElement('fieldset');
  activeMode = true;
  renderPin(adverts);
  renderCard(adverts[0]);
};

var getCoordinates = function (element) {
  element.left = Math.round(element.offsetLeft + element.offsetWidth / 2);
  if (activeMode) {
    element.top = Math.round(element.offsetTop + element.offsetHeight);
  } else {
    element.top = Math.round(element.offsetTop + element.offsetHeight / 2);
  }
  return element;
};

var fillAddressInput = function () {
  var coordinates = getCoordinates(mapPin);
  adFormAddress.value = coordinates.left + ', ' + coordinates.top;
};

mapPin.addEventListener('mousedown', function () {
  activateMap();
  fillAddressInput();
});

mapPin.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    activateMap();
    fillAddressInput();
  }
});

fillAddressInput();

var roomCapacity = {
  1: [1],
  2: [1, 2],
  3: [1, 2, 3],
  100: [0],
};

var adFormRooms = adForm.querySelector('#room_number');
var adFormCapacity = adForm.querySelector('#capacity');
var adFormSubmit = adForm.querySelector('.ad-form__submit');

var customValidation = function () {
  var roomsValue = adFormRooms.value;
  var guestsValue = adFormCapacity.value;
  var acceptableNumber = roomCapacity[roomsValue];
  var maxGuests = acceptableNumber[acceptableNumber.length - 1];
  var minGuests = acceptableNumber[0];

  if (minGuests === 0) {
    adFormCapacity.setCustomValidity('Выбор не для гостей');
  } else if (guestsValue > maxGuests) {
    adFormCapacity.setCustomValidity('Максимальное кол-во гостей ' + maxGuests);
  } else if (guestsValue < minGuests) {
    adFormCapacity.setCustomValidity('Выбрать кол-во гостей');
  } else {
    adFormCapacity.setCustomValidity('');
  }
};

adFormSubmit.addEventListener('click', function () {
  customValidation();
});
