'use strict';

(function () {
  var main = document.querySelector('main');
  var successAlertTemplate = document.querySelector('#success');
  var successAlert = successAlertTemplate.content.querySelector('.success');
  var errorAlertTemplate = document.querySelector('#error');
  var errorAlert = errorAlertTemplate.content.querySelector('.error');

  var renderSuccessAlert = function () {
    main.appendChild(successAlert);
  };

  var renderErrorAlert = function () {
    main.appendChild(errorAlert);
  };

  window.alerts = {
    renderSuccess: renderSuccessAlert,
    renderError: renderErrorAlert,
  };
})();
