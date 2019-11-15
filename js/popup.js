'use strict';

(function () {

  var filtersBloc = window.data.map.querySelector('.map__filters-container');

  var activatePin = function (adItem, pin) {
    deactivatePin();

    pin.classList.add('map__pin--active');
    getCurrentAd(adItem);
  };

  var deactivatePin = function () {
    var activePin = window.data.map.querySelector('.map__pin--active');

    if (activePin) {
      activePin.classList.remove('map__pin--active');
    }
  };

  var hidePopup = function (popup) {
    popup.style.display = 'none';
  };

  var getCurrentAd = function (adItem) {
    var cardFragment = window.card.createCard(adItem);
    var currentMapPopup = window.data.map.querySelector('.map__card');

    if (!currentMapPopup) {
      window.data.map.insertBefore(cardFragment, filtersBloc);
    } else {
      window.data.map.replaceChild(cardFragment, currentMapPopup);
    }

    var mapPopup = window.data.map.querySelector('.popup');
    var mapPopupClose = mapPopup.querySelector('.popup__close');

    mapPopupClose.addEventListener('click', function () {
      hidePopup(mapPopup);
      deactivatePin();
    });

    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.util.ESC_KEYCODE) {
        hidePopup(mapPopup);
        deactivatePin();
      }
    });
  };

  window.popup = {
    activatePin: activatePin
  };

})();
