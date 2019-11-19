'use strict';

(function () {

  var PINS_NUMBER_LIMIT = 5;

  var pinTemplate = document.querySelector('#pin').content;
  var pinTemplateElement = pinTemplate.querySelector('.map__pin');
  var pinListElement = document.querySelector('.map__pins');

  var pinsData = [];
  var mapFilters = window.data.map.querySelector('.map__filters');

  var countPins = function (pins) {
    return (pins.length < PINS_NUMBER_LIMIT) ? pins.length : PINS_NUMBER_LIMIT;
  };

  var createPin = function (pin) {
    var pinElement = pinTemplateElement.cloneNode(true);
    pinElement.style.left = pin.location.x + 'px';
    pinElement.style.top = pin.location.y + 'px';
    pinElement.querySelector('img').src = pin.author.avatar;
    pinElement.querySelector('img').alt = pin.offer.title;

    pinElement.addEventListener('click', function () {
      window.popup.activatePin(pin, pinElement);
    });

    pinElement.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.util.ENTER_KEYCODE) {
        window.popup.activatePin(pin, pinElement);
      }
    });

    return pinElement;
  };

  var renderPins = function (pins) {
    var pinsNumber = countPins(pins);
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < pinsNumber; i++) {
      fragment.appendChild(createPin(pins[i]));
    }
    pinListElement.appendChild(fragment);
  };

  var loadPins = function () {
    window.backend.load(onSuccessPinsLoad, window.messages.onError);
  };

  var deletePins = function () {
    var pins = pinListElement.querySelectorAll('.map__pin:not(.map__pin--main)');
    pins.forEach(function (pin) {
      pin.remove();
    });
  };

  var onSuccessPinsLoad = function (data) {
    pinsData = data;
    renderPins(pinsData);
  };

  var filterTypes = {
    'housing-type': function (data, filter) {
      return data.offer.type === filter.value;
    },

    'housing-price': function (data, filter) {
      return data.offer.price >= window.data.PriceValues[filter.value].start
      && data.offer.price < window.data.PriceValues[filter.value].end;
    },

    'housing-rooms': function (data, filter) {
      return filter.value === data.offer.rooms.toString();
    },

    'housing-guests': function (data, filter) {
      return filter.value === data.offer.guests.toString();
    },

    'housing-features': function (data, filter) {
      var checkListElements = Array.from(filter.querySelectorAll('input[type=checkbox]:checked'));

      return checkListElements.every(function (it) {
        return data.offer.features.some(function (feature) {
          return feature === it.value;
        });
      });
    }
  };

  var getFilterData = function (data, elements) {
    return data.filter(function (item) {
      return elements.every(function (filter) {
        return (filter.value === 'any') ? true : filterTypes[filter.id](item, filter);
      });
    });
  };

  var onFormFiltersChange = window.debounce(function () {
    var filterElements = [];

    filterElements = Array.from(mapFilters.children);
    deletePins();
    window.popup.hidePopup();
    renderPins(getFilterData(pinsData, filterElements));
  });

  mapFilters.addEventListener('change', onFormFiltersChange);

  window.pin = {
    deletePins: deletePins,
    mapFilters: mapFilters,
    loadPins: loadPins
  };

})();
