'use strict';

(function () {

  var adForm = document.querySelector('.ad-form');
  var adFormAddress = adForm.querySelector('#address');
  var adFormRooms = adForm.querySelector('#room_number');
  var adFormCapacity = adForm.querySelector('#capacity');
  var timeInSelect = adForm.querySelector('#timein');
  var timeOutSelect = adForm.querySelector('#timeout');
  var housingTypeSelect = adForm.querySelector('#type');
  var housingPriceSelect = adForm.querySelector('#price');
  var adFormSubmit = adForm.querySelector('.ad-form__submit');

  var disableElement = function (element) {
    var elements = document.querySelectorAll(element);
    for (var i = 0; i < elements.length; i++) {
      elements[i].disabled = true;
    }
  };

  var enableElement = function (element) {
    var elements = document.querySelectorAll(element);
    for (var i = 0; i < elements.length; i++) {
      elements[i].disabled = false;
    }
  };

  var disableForm = function () {
    disableElement('select');
    disableElement('fieldset');
  };

  var enableForm = function () {
    adForm.classList.remove('ad-form--disabled');
    enableElement('select');
    enableElement('fieldset');
  };

  timeInSelect.addEventListener('change', function () {
    timeOutSelect.value = timeInSelect.value;
  });

  timeOutSelect.addEventListener('change', function () {
    timeInSelect.value = timeOutSelect.value;
  });

  housingTypeSelect.addEventListener('change', function () {
    housingPriceSelect.placeholder = window.data.housingTypePrice[housingTypeSelect.value].price;
    housingPriceSelect.min = window.data.housingTypePrice[housingTypeSelect.value].price;
  });

  var customValidation = function () {
    var roomsValue = Number(adFormRooms.options[adFormRooms.selectedIndex].value);
    var guestsValue = Number(adFormCapacity.options[adFormCapacity.selectedIndex].value);
    var acceptableNumber = window.data.roomCapacity[roomsValue];
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
  };

  adFormSubmit.addEventListener('click', function () {
    customValidation();
  });

  window.form = {
    disableForm: disableForm,
    enableForm: enableForm,
    adFormAddress: adFormAddress
  };

})();
