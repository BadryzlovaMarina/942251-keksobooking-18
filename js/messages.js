'use strict';

(function () {

  var mainElement = document.querySelector('main');

  var onSuccessLoad = function () {
    var successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
    var successElement = successMessageTemplate.cloneNode(true);
    mainElement.appendChild(successElement);
    successElement.classList.add('message');
    document.addEventListener('click', onMessageClick);
    document.addEventListener('keydown', onMessageEscPress);
  };

  var closeMessage = function () {
    var element = document.querySelector('.message');
    element.remove();
    document.removeEventListener('click', onMessageClick);
    document.removeEventListener('keydown', onMessageEscPress);
  };

  var onMessageClick = function () {
    closeMessage();
  };
  var onMessageEscPress = function (evt) {
    if (evt.keyCode === window.util.ESC_KEYCODE) {
      closeMessage();
    }
  };

  var closeErrorBlock = function () {
    var pageMain = document.querySelector('main');
    var errorElement = pageMain.querySelector('.error');
    errorElement.remove();
    document.removeEventListener('keydown', onErrorEsc);
    errorElement.removeEventListener('click', onErrorClick);
  };

  var onErrorEsc = function (evt) {
    if (evt.keyCode === window.util.ESC_KEYCODE) {
      closeErrorBlock();
    }
  };

  var onErrorClick = function () {
    closeErrorBlock();
  };

  var onErrorLoad = function (errorMessage) {
    var errorTemplate = document.querySelector('#error').content.querySelector('.error');
    var errorElement = errorTemplate.cloneNode(true);

    errorElement.querySelector('.error__message').textContent = errorMessage;
    mainElement.appendChild(errorElement);

    errorElement.addEventListener('click', onErrorClick);
    document.addEventListener('keydown', onErrorEsc);
  };

  window.messages = {
    onErrorLoad: onErrorLoad,
    onSuccessLoad: onSuccessLoad
  };

})();
