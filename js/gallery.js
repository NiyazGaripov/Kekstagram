'use strict';

(function () {
  var AMOUNT_PHOTOS = 25;

  var templatePicture = document.querySelector('#picture');
  var linkPicture = templatePicture.content.querySelector('.picture');
  var blockPictures = document.querySelector('.pictures');

  var createDomElements = function (element) {
    var domElements = linkPicture.cloneNode(true);
    domElements.querySelector('.picture__img').src = 'img/' + element.url;
    domElements.querySelector('.picture__likes').textContent = element.likes;
    domElements.querySelector('.picture__comments').textContent = element.comments.length;

    return domElements;
  };

  var successLoadDataHandler = function (photos) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < AMOUNT_PHOTOS; i++) {
      fragment.appendChild(createDomElements(photos[i]));
    }
    blockPictures.appendChild(fragment);
  };

  var errorLoadDataHandler = function () {
    console.log(0);
  };

  window.backend.load(successLoadDataHandler, errorLoadDataHandler);

})();
