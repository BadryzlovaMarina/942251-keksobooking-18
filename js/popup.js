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

  var onPopupCloseButtonClick = function () {
    hidePopup();
    deactivatePin();
  };

  var onPopupEscPress = function (evt) {
    if (evt.keyCode === window.util.ESC_KEYCODE) {
      hidePopup();
      deactivatePin();
    }
  };

  var hidePopup = function () {
    var popup = window.data.map.querySelector('.popup');
    if (popup) {
      var popupButtonClose = popup.querySelector('.popup__close');
      popupButtonClose.removeEventListener('click', onPopupCloseButtonClick);
      document.removeEventListener('keydown', onPopupEscPress);
      popup.remove();
    }
  };

  var getCurrentAd = function (adItem) {
    var cardFragment = window.card.create(adItem);
    var currentMapPopup = window.data.map.querySelector('.map__card');

    if (!currentMapPopup) {
      window.data.map.insertBefore(cardFragment, filtersBloc);
    } else {
      window.data.map.replaceChild(cardFragment, currentMapPopup);
    }

    var popupButtonClose = window.data.map.querySelector('.popup__close');

    popupButtonClose.addEventListener('click', onPopupCloseButtonClick);
    document.addEventListener('keydown', onPopupEscPress);
  };

  window.popup = {
    activatePin: activatePin,
    hide: hidePopup
  };

})();
