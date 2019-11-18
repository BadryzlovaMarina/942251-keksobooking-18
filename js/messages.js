'use strict';

(function () {

  var showSuccessMessage = function () {
    var successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
    var successElement = successMessageTemplate.cloneNode(true);
    window.pin.mainElement.appendChild(successElement);
    successElement.classList.add('message');
    document.addEventListener('click', onMessageClick);
    document.addEventListener('keydown', onMessageEscPress);
  };

  var onMessageClick = function () {
    closeMessage();
  };
  var onMessageEscPress = function (evt) {
    if (evt.keyCode === window.util.ESC_KEYCODE) {
      closeMessage();
    }
  };

  var closeMessage = function () {
    var element = document.querySelector('.message');
    element.remove();
    document.removeEventListener('click', onMessageClick);
    document.removeEventListener('keydown', onMessageEscPress);
  };

  var onError = function (actionType, errorMessage) {
    var errorTemplate = document.querySelector('#error').content.querySelector('.error');
    var errorElement = errorTemplate.cloneNode(true);
    var errorButton = errorElement.querySelector('.error__button');

    errorElement.querySelector('.error__message').textContent = errorMessage;
    window.pin.mainElement.appendChild(errorElement);

    var onErrorButtonClick = function () {
      if (actionType === 'load') {
        window.backend.load(window.pin.onLoad, onError);
      } else {
        window.backend.load(window.form.onSave, onError);
      }
      window.pin.mainElement.removeChild(errorElement);
    };

    errorButton.addEventListener('click', onErrorButtonClick);
  };

  window.messages = {
    onError: onError,
    showSuccessMessage: showSuccessMessage
  };

})();
