'use strict';

(function () {
  var main = document.querySelector('main');
  var successAlertTemplate = document.querySelector('#success');
  var successAlert = successAlertTemplate.content.querySelector('.success');

  var renderSuccessAlert = function () {
    main.appendChild(successAlert);
  };

  window.alerts = {
    renderSuccess: renderSuccessAlert,
  };
})();
