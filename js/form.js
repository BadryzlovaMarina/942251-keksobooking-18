'use strict';

(function () {

  var DEFAULT_HOUSING_PRICE = 1000;
  var MAX_ROOM_NUMBER = 100;

  var adForm = document.querySelector('.ad-form');
  var addressInputElement = adForm.querySelector('#address');
  var roomNumberElement = adForm.querySelector('#room_number');
  var capacityElement = adForm.querySelector('#capacity');
  var timeInElement = adForm.querySelector('#timein');
  var timeOutElement = adForm.querySelector('#timeout');
  var housingTypeElement = adForm.querySelector('#type');
  var priceElement = adForm.querySelector('#price');
  var submitButtonElement = adForm.querySelector('.ad-form__submit');
  var titleElement = adForm.querySelector('#title');
  var descriptionElement = adForm.querySelector('#description');
  var optionElements = adForm.querySelectorAll('option');
  var featureElements = adForm.querySelectorAll('[type="checkbox"]');
  var resetButtonElement = adForm.querySelector('.ad-form__reset');
  var formDisabledClass = 'ad-form--disabled';

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
    adForm.classList.remove(formDisabledClass);
    adForm.addEventListener('submit', onSubmit);
    resetButtonElement.addEventListener('click', onReset);
  };

  timeInElement.addEventListener('change', function () {
    timeOutElement.value = timeInElement.value;
  });

  timeOutElement.addEventListener('change', function () {
    timeInElement.value = timeOutElement.value;
  });

  housingTypeElement.addEventListener('change', function () {
    priceElement.placeholder = window.data.HousingTypePrice[housingTypeElement.value].price;
    priceElement.min = window.data.HousingTypePrice[housingTypeElement.value].price;
  });

  var validateForm = function () {
    var roomsValue = Number(roomNumberElement.options[roomNumberElement.selectedIndex].value);
    var guestsValue = Number(capacityElement.options[capacityElement.selectedIndex].value);
    var acceptableNumber = window.data.RoomCapacity[roomsValue];
    var maxGuests = acceptableNumber[acceptableNumber.length - 1];
    var minGuests = acceptableNumber[0];

    if ((guestsValue > maxGuests) && (roomsValue < MAX_ROOM_NUMBER)) {
      capacityElement.setCustomValidity('Максимальное кол-во гостей ' + maxGuests);
    } else if (guestsValue > maxGuests) {
      capacityElement.setCustomValidity('Выбор не для гостей');
    } else if (guestsValue < minGuests) {
      capacityElement.setCustomValidity('Выбрать кол-во гостей');
    } else {
      capacityElement.setCustomValidity('');
    }
  };

  submitButtonElement.addEventListener('click', function () {
    validateForm();
  });

  var onSave = function () {
    window.messages.showSuccessMessage();
    resetForm();
    inactiveModeOn();
  };

  var onSubmit = function (evt) {
    window.backend.load(onSave, window.messages.onError, new FormData(adForm));
    evt.preventDefault();
  };

  var onReset = function () {
    resetForm();
    inactiveModeOn();
  };

  var resetHousingPrice = function () {
    priceElement.placeholder = DEFAULT_HOUSING_PRICE;
    priceElement.min = DEFAULT_HOUSING_PRICE;
  };

  var resetForm = function () {
    titleElement.value = '';
    priceElement.value = '';
    descriptionElement.value = '';

    optionElements.forEach(function (el) {
      el.selected = el.defaultSelected;
    });

    featureElements.forEach(function (el) {
      el.checked = el.defaultChecked;
    });

    resetHousingPrice();

    window.pin.mapFilters.reset();

    adForm.removeEventListener('submit', onSubmit);
  };

  var inactivateMap = function () {
    window.popup.hidePopup();
    window.util.activeMode = false;
    window.data.map.classList.add(window.util.FADED);
    window.pin.deletePins();
    window.map.inactiveMapListeners();
    window.map.setDefaultMainPin();
    window.photo.resetUploadedImg();
  };

  var inactivateForm = function () {
    adForm.classList.add(formDisabledClass);
    resetButtonElement.removeEventListener('click', onReset);
  };

  var inactiveModeOn = function () {
    inactivateMap();
    disableForm();
    inactivateForm();
  };

  window.form = {
    adForm: adForm,
    disableForm: disableForm,
    enableForm: enableForm,
    addressInputElement: addressInputElement,
    onSave: onSave
  };

})();
