'use strict';

(function () {
  var ENTER_KEY = 'Enter';
  var AMOUNT_PHOTOS = 25;
  var allPhotos = [];
  var templatePicture = document.querySelector('#picture');
  var linkPicture = templatePicture.content.querySelector('.picture');
  var blockPictures = document.querySelector('.pictures');
  var filter = document.querySelector('.img-filters');
  var filterControls = filter.querySelectorAll('.img-filters__button');

  var SortType = {
    DEFAULT: `filter-default`,
    RANDOM: `filter-random`,
    DISCUSSED: `filter-discussed`,
  };

  var photo = {
    onDefaultChange: function () {},
    onRandomChange: function () {},
    onMostCommentsChange: function () {},
  }

  var createDomElements = function (element) {
    var domElements = linkPicture.cloneNode(true);
    domElements.querySelector('.picture__img').src = 'img/' + element.url;
    domElements.querySelector('.picture__likes').textContent = element.likes;
    domElements.querySelector('.picture__comments').textContent = element.comments.length;

    return domElements;
  };

  var sortPhotos = function (type) {
    var sortedPhotos = [];

    switch (type) {
      case SortType.DEFAULT:
        sortedPhotos = allPhotos;
        return sortedPhotos;
      case SortType.RANDOM:
        sortedPhotos = allPhotos.sort((a, b) =>  b - a).slice(0, 10);
        return sortedPhotos
      case SortType.DISCUSSED:
        sortedPhotos = allPhotos.sort((a, b) => b.comments.length - a.comments.length);
        return sortedPhotos;
    }
  }

  var render = function (photos) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < photos.length; i++) {
      fragment.appendChild(createDomElements(photos[i]));
    }
    blockPictures.appendChild(fragment);
  }

  var successLoadDataHandler = function (photos) {
    allPhotos = photos;
    render(photos);
    filter.classList.remove('img-filters--inactive');
  };

  var errorLoadDataHandler = function (message) {
    window.alerts.create(message)
  };

  window.backend.load(successLoadDataHandler, errorLoadDataHandler);

  var previewPictureClickHandler = function (evt) {
    allPhotos.forEach(function(item, index) {
      if (evt.target.src.split('/').slice(-2).join('/') === allPhotos[index].url) {
        window.preview.openPicture(item);
      }
    })
  };

  var previewPictureKeyDownHandler = function (evt) {
    if (evt.key === ENTER_KEY) {
      allPhotos.forEach(function(item, index) {
        var current = evt.target.querySelector('.picture__img');

        if (current.src.split('/').slice(-2).join('/') === allPhotos[index].url) {
          window.preview.openPicture(item);
        }
      })
    }
  };

  blockPictures.addEventListener('click', previewPictureClickHandler);
  blockPictures.addEventListener('keydown', previewPictureKeyDownHandler);
})();
