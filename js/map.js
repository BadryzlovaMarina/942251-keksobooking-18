'use strict';

(function () {

  var mapFilter = window.data.map.querySelector('.map__filters');
  var mapPin = window.data.map.querySelector('.map__pin--main');

  var onMainPinClick = function () {
    activateMap();
  };

  var onMainPinEnterPress = function (evt) {
    if (evt.keyCode === window.util.ENTER_KEYCODE) {
      activateMap();
    }
  };

  var activateMap = function () {
    window.data.map.classList.remove('map--faded');
    mapFilter.classList.remove('map__filters--disabled');
    window.util.activeMode = true;
    window.form.fillAddressInput(mapPin);
    window.form.enableForm();
    window.pin.renderPin(window.data.adverts);
    mapPin.removeEventListener('mousedown', onMainPinClick);
    mapPin.removeEventListener('keydown', onMainPinEnterPress);
  };

  mapPin.addEventListener('mousedown', onMainPinClick);
  mapPin.addEventListener('keydown', onMainPinEnterPress);

  var init = function () {
    window.form.disableForm();
    window.form.fillAddressInput(mapPin);
  };

  init();

})();
