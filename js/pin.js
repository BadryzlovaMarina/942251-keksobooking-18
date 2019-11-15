'use strict';

(function () {

  var pinTemplate = document.querySelector('#pin').content;
  var pinTemplateElement = pinTemplate.querySelector('.map__pin');
  var pinListElement = document.querySelector('.map__pins');

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

  var renderPin = function (pin) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < pin.length; i++) {
      fragment.appendChild(createPin(pin[i]));
    }
    pinListElement.appendChild(fragment);
  };

  window.pin = {
    renderPin: renderPin
  };

})();
