'use strict';

(function () {
  var main = document.querySelector('main');

  var renderAlert = function (alert) {
    main.appendChild(alert);
  };

  var removeAlert = function (alert) {
    alert.remove();
  };

  window.alerts = {
    render: renderAlert,
    remove: removeAlert,
  };
})();
