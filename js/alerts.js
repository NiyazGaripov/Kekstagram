'use strict';

(function () {
  var main = document.querySelector('main');

  var renderAlert = function (alert) {
    main.appendChild(alert);
  };

  var removeAlert = function (alert) {
    alert.remove();
  };

  var createAlertElement = function (message) {
    var node = document.createElement('div');
    node.style = 'z-index: 1; margin: 0 auto; text-align: center;';
    node.style.position = 'absolute';
    node.style.right = 0;
    node.style.left = 0;
    node.style.fontSize = '30px';
    node.style.backgroundColor = message ? 'red' : 'green';

    node.textContent = message ? message : 'Данные успешно отправлены';

    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.alerts = {
    render: renderAlert,
    remove: removeAlert,
    create: createAlertElement,
  };
})();
