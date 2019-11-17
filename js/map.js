'use strict';

(function () {

  var mapFilter = window.data.map.querySelector('.map__filters');
  var mapPin = window.data.map.querySelector('.map__pin--main');
  var mapOverlay = document.querySelector('.map__overlay');
  var heightScalePin = {INACTIVE: 1, ACTIVE: 2};

  var getMainPinCoordinates = function () {
    var heightScale = window.util.activeMode ? heightScalePin.INACTIVE : heightScalePin.ACTIVE;
    return {
      top: Math.round(mapPin.offsetTop + mapPin.offsetHeight / heightScale),
      left: Math.round(mapPin.offsetLeft + mapPin.offsetWidth / heightScalePin.ACTIVE),
    };
  };

  var onMainPinClick = function () {
    activateMap();
  };

  var onMainPinEnterPress = function (evt) {
    if (evt.keyCode === window.util.ENTER_KEYCODE) {
      activateMap();
    }
  };

  var onMainPinMouseDown = function (evt) {
    if (window.util.activeMode) {
      evt.preventDefault();

      var PIN_LIMITS = {
        yMin: window.data.MIN_Y - window.data.PIN_HEIGHT,
        yMax: window.data.MAX_Y - window.data.PIN_HEIGHT
      };

      var startCoords = {
        x: evt.clientX,
        y: evt.clientY
      };

      var dragged = false;

      var onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();
        dragged = true;

        var shift = {
          x: startCoords.x - moveEvt.clientX,
          y: startCoords.y - moveEvt.clientY
        };

        startCoords = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };

        var currentCoords = {
          x: mapPin.offsetLeft - shift.x,
          y: mapPin.offsetTop - shift.y
        };

        if (currentCoords.y >= PIN_LIMITS.yMin
          && currentCoords.y <= PIN_LIMITS.yMax
          && currentCoords.x >= mapOverlay.clientLeft
          && currentCoords.x <= (mapOverlay.clientLeft + mapOverlay.clientWidth - mapPin.clientWidth)) {
          mapPin.style.top = currentCoords.y + 'px';
          mapPin.style.left = currentCoords.x + 'px';
        }
        fillAddressInput();
      };

      var onMouseUp = function (upEvt) {
        upEvt.preventDefault();
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);

        if (dragged) {
          var onClickPreventDefault = function (drEvt) {
            drEvt.preventDefault();
            mapPin.removeEventListener('click', onClickPreventDefault);
          };
          mapPin.addEventListener('click', onClickPreventDefault);
        }
        fillAddressInput();
      };
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    } else {
      activateMap();
    }
  };

  var fillAddressInput = function () {
    var coordinates = getMainPinCoordinates();
    window.form.adFormAddress.value = coordinates.left + ', ' + coordinates.top;
  };

  var activateMap = function () {
    window.data.map.classList.remove('map--faded');
    mapFilter.classList.remove('map__filters--disabled');
    window.util.activeMode = true;
    fillAddressInput();
    window.form.enableForm();
    window.pin.loadPins();
    mapPin.removeEventListener('mousedown', onMainPinClick);
    mapPin.removeEventListener('keydown', onMainPinEnterPress);
  };

  mapPin.addEventListener('mousedown', onMainPinClick);
  mapPin.addEventListener('keydown', onMainPinEnterPress);
  mapPin.addEventListener('mousedown', onMainPinMouseDown);

  var init = function () {
    window.form.disableForm();
    fillAddressInput();
  };

  init();

})();
