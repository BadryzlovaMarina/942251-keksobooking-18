'use strict';

var ENTER_KEYCODE = 13;
var ESC_KEYCODE = 27;
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
var pinTemplate = document.querySelector('#pin').content;
var pinTemplateElement = pinTemplate.querySelector('.map__pin');
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

var mapPin = document.querySelector('.map__pin--main');
var adForm = document.querySelector('.ad-form');
var mapFilter = document.querySelector('.map__filters');
var adFormAddress = adForm.querySelector('#address');
var activeMode = false;

map.classList.add('map--faded');

var disableElement = function (element) {
  var elements = document.querySelectorAll(element);
  for (var i = 0; i < elements.length; i++) {
    elements[i].disabled = true;
  }
};

disableElement('select');
disableElement('fieldset');


var enableElement = function (element) {
  var elements = document.querySelectorAll(element);
  for (var i = 0; i < elements.length; i++) {
    elements[i].disabled = false;
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
  mapPin.removeEventListener('mousedown', onMainPinClick);
  mapPin.removeEventListener('keydown', onMainPinEnterPress);
  fillAddressInput(mapPin);
};

var getCoordinates = function (element) {
  var heightScale = activeMode ? 1 : 2;
  element.top = Math.round(element.offsetTop + element.offsetHeight / heightScale);
  element.left = Math.round(element.offsetLeft + element.offsetWidth / 2);
  return element;
};

var fillAddressInput = function (pin) {
  var coordinates = getCoordinates(pin);
  adFormAddress.value = coordinates.left + ', ' + coordinates.top;
};

fillAddressInput(mapPin);

var onMainPinClick = function () {
  activateMap();
};

mapPin.addEventListener('mousedown', onMainPinClick);

var onMainPinEnterPress = function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    activateMap();
  }
};

mapPin.addEventListener('keydown', onMainPinEnterPress);

var roomCapacity = {
  1: [1],
  2: [1, 2],
  3: [1, 2, 3],
  100: [0],
};


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

var adFormRooms = adForm.querySelector('#room_number');
var adFormCapacity = adForm.querySelector('#capacity');
var timeInSelect = adForm.querySelector('#timein');
var timeOutSelect = adForm.querySelector('#timeout');
var housingTypeSelect = adForm.querySelector('#type');
var housingPriceSelect = adForm.querySelector('#price');
var adFormSubmit = adForm.querySelector('.ad-form__submit');

var customValidation = function () {
  var roomsValue = Number(adFormRooms.options[adFormRooms.selectedIndex].value);
  var guestsValue = Number(adFormCapacity.options[adFormCapacity.selectedIndex].value);
  var acceptableNumber = roomCapacity[roomsValue];
  var maxGuests = acceptableNumber[acceptableNumber.length - 1];
  var minGuests = acceptableNumber[0];

  if ((guestsValue > maxGuests) && (roomsValue < 100)) {
    adFormCapacity.setCustomValidity('Максимальное кол-во гостей ' + maxGuests);
  } else if (guestsValue > maxGuests) {
    adFormCapacity.setCustomValidity('Выбор не для гостей');
  } else if (guestsValue < minGuests) {
    adFormCapacity.setCustomValidity('Выбрать кол-во гостей');
  } else {
    adFormCapacity.setCustomValidity('');
  }

  timeInSelect.addEventListener('change', function () {
    timeOutSelect.value = timeInSelect.value;
  });

  timeOutSelect.addEventListener('change', function () {
    timeInSelect.value = timeOutSelect.value;
  });

  housingTypeSelect.addEventListener('change', function () {
    housingPriceSelect.placeholder = housingTypePrice[housingTypeSelect.value].price;
    housingPriceSelect.min = housingTypePrice[housingTypeSelect.value].price;
  });

};

adFormSubmit.addEventListener('click', function () {
  customValidation();
});

var cardFragment = document.createDocumentFragment();
var filtersBloc = map.querySelector('.map__filters-container');

var deactivatePin = function () {
  var activePin = map.querySelector('.map__pin--active');

  if (activePin) {
    activePin.classList.remove('map__pin--active');
  }
};

var hidePopup = function (popup) {
  popup.style.display = 'none';
};

var getCurrentAd = function (adItem) {
  cardFragment.appendChild(createCard(adItem));
  var currentMapPopup = map.querySelector('.map__card');

  if (!currentMapPopup) {
    map.insertBefore(cardFragment, filtersBloc);
  } else {
    map.replaceChild(cardFragment, currentMapPopup);
  }

  var mapPopup = map.querySelector('.popup');
  var mapPopupClose = mapPopup.querySelector('.popup__close');

  mapPopupClose.addEventListener('click', function () {
    hidePopup(mapPopup);
    deactivatePin();
  });

  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      hidePopup(mapPopup);
      deactivatePin();
    }
  });
};

var activatePin = function (adItem, pin) {
  deactivatePin();

  pin.classList.add('map__pin--active');
  getCurrentAd(adItem);
  fillAddressInput(pin);
};

var createPin = function (pin) {
  var pinElement = pinTemplateElement.cloneNode(true);

  pinElement.style.left = pin.location.x + 'px';
  pinElement.style.top = pin.location.y + 'px';
  pinElement.querySelector('img').src = pin.author.avatar;
  pinElement.querySelector('img').alt = pin.offer.title;


  pinElement.addEventListener('click', function () {
    activatePin(pin, pinElement);
  });

  pinElement.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      activatePin(pin, pinElement);
    }
  });

  return pinElement;
};

var renderPin = function (pin) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < pin.length; i++) {
    fragment.appendChild(createPin(pin[i]));
  }
  pinListElement.appendChild(fragment);
};
