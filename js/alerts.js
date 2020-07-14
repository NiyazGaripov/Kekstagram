'use strict';

(function () {
  var main = document.querySelector('main');

  var renderAlert = function (alert) {
    main.appendChild(alert);
  };

  window.alerts = {
    render: renderAlert,
  };
})();
