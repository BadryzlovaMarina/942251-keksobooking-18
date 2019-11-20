'use strict';

(function () {

  var URL_LOAD = 'https://jjs.dump.academy/keksobooking/data';
  var URL_SAVE = 'https://js.dump.academy/keksobooking';
  var TIMEOUT = 10000;
  var SUCCESS_RESPONSE = 200;

  var load = function (onSuccess, onError, data) {
    var methodType = 'GET';
    var url = URL_LOAD;
    if (data) {
      methodType = 'POST';
      url = URL_SAVE;
    }
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === SUCCESS_RESPONSE) {
        onSuccess(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT;

    xhr.open(methodType, url);
    xhr.send(data);
  };

  window.backend = {
    load: load,
  };

})();
