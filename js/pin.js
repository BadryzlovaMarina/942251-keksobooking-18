'use strict';

(function () {

  var mainElement = document.querySelector('main');
  var pinTemplate = document.querySelector('#pin').content;
  var pinTemplateElement = pinTemplate.querySelector('.map__pin');
  var pinListElement = document.querySelector('.map__pins');

  var PINS_NUMBER_LIMIT = 5;

  var countPins = function (pins) {
    if (pins.length < PINS_NUMBER_LIMIT) {
      var pinsNumber = pins.length;
    } else {
      pinsNumber = PINS_NUMBER_LIMIT;
    }
    return pinsNumber;
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

  var onLoad = function (data) {
    renderPins(data);
  };

  var loadPins = function () {
    window.backend.load(onLoad, window.messages.onError);
  };

  var deletePins = function () {
    var pins = pinListElement.querySelectorAll('.map__pin:not(.map__pin--main)');
    for (var i = 0; i < pins.length; i++) {
      pins[i].parentNode.removeChild(pins[i]);
    }
  };

  window.pin = {
    mainElement: mainElement,
    loadPins: loadPins,
    onLoad: onLoad,
    deletePins: deletePins
  };

})();
