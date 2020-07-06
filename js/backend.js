'use strict';
(function () {
  var UrlTypes = {
    POST: 'https://javascript.pages.academy/kekstagram',
    GET: 'https://javascript.pages.academy/kekstagram/data',
  };

  var StatusCode = {
    OK: 200,
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    INTERNAL_SERVER: 500,
  };

  var TIMEOUT = 10000;

  var processServerResponse = function (xhr, method, onLoad, onError) {
    xhr.responseType = 'json';
    xhr.timeout = TIMEOUT;

    xhr.open(method, UrlTypes[method]);

    xhr.addEventListener('load', function () {
      switch (xhr.status) {
        case StatusCode.OK:
          onLoad(xhr.response);
          break;
        case StatusCode.BAD_REQUEST:
          onError('Сервер не смог обработать ваш запрос. Попробуйте открыть сайт другим браузером.');
          break;
        case StatusCode.NOT_FOUND:
          onError('Запрашиваемая страница не найдена. Проверьте корректность введённого адреса страницы.');
          break;
        case StatusCode.INTERNAL_SERVER:
          onError('Сервер не отвечает. Повторите попытку позже.');
          break;
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения! Проверьте соединение с интернетом');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

  };

  var loadData = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = TIMEOUT;

    xhr.open('GET', UrlTypes.GET);

    xhr.addEventListener('load', function () {
      switch (xhr.status) {
        case StatusCode.OK:
          onLoad(xhr.response);
          break;
        case StatusCode.BAD_REQUEST:
          onError('Сервер не смог обработать ваш запрос. Попробуйте открыть сайт другим браузером.');
          break;
        case StatusCode.NOT_FOUND:
          onError('Запрашиваемая страница не найдена. Проверьте корректность введённого адреса страницы.');
          break;
        case StatusCode.INTERNAL_SERVER:
          onError('Сервер не отвечает. Повторите попытку позже.');
          break;
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения! Проверьте соединение с интернетом');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.send();
  };

  window.backend = {
    load: loadData,
  };

})();
