'use strict';

(function () {

  var onLoad = function (data) {
    window.pin.renderPins(data);
  };

  var onError = function (errorMessage) {
    var mainElement = document.querySelector('main');
    var errorTemplate = document.querySelector('#error').content.querySelector('.error');
    var errorElement = errorTemplate.cloneNode(true);
    var errorButton = errorElement.querySelector('.error__button');

    errorElement.querySelector('.error__message').textContent = errorMessage;
    mainElement.appendChild(errorElement);

    var onErrorButtonClick = function () {
      window.backend.load(onLoad, onError);
      mainElement.removeChild(errorElement);
    };

    errorButton.addEventListener('click', onErrorButtonClick);
  };

  window.messages = {
    onError: onError,
    onLoad: onLoad
  };

})();
