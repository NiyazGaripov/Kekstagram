'use strict';

(function () {
  var FIRST_INDEX = 0;
  var LAST_INDEX = 10;
  var ACTIVE_CLASS = 'img-filters__button--active';
  var allPhotos = [];
  var templatePicture = document.querySelector('#picture');
  var linkPicture = templatePicture.content.querySelector('.picture');
  var blockPictures = document.querySelector('.pictures');
  var filter = document.querySelector('.img-filters');
  var filterForm = filter.querySelector('.img-filters__form');
  var filterControls = filterForm.querySelectorAll('.img-filters__button');

  var SortType = {
    DEFAULT: 'filter-default',
    RANDOM: 'filter-random',
    DISCUSSED: 'filter-discussed',
  };

  var createDomElements = function (element) {
    var domElements = linkPicture.cloneNode(true);
    domElements.querySelector('.picture__img').src = 'img/' + element.url;
    domElements.querySelector('.picture__likes').textContent = element.likes;
    domElements.querySelector('.picture__comments').textContent = element.comments.length;

    return domElements;
  };

  var shuffle = function (array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  var sortPhotos = function (type) {
    var sortedPhotos = allPhotos.slice();

    switch (type) {
      case SortType.DEFAULT:
        return allPhotos;
      case SortType.RANDOM:
        sortedPhotos = shuffle(sortedPhotos).slice(FIRST_INDEX, LAST_INDEX);
        return sortedPhotos
      case SortType.DISCUSSED:
        sortedPhotos = sortedPhotos.sort(function(a, b) {
          return b.comments.length - a.comments.length;
        })
        return sortedPhotos;
    }
  }

  var setActiveClass = function (container, element) {
    var node = container.querySelector('.' + ACTIVE_CLASS);

    if (!element.classList.contains(ACTIVE_CLASS)) {
      node.classList.remove(ACTIVE_CLASS);
      element.classList.add(ACTIVE_CLASS);
    }
  };

  var update = function () {
    for (let control of filterControls) {
      control.addEventListener('click', function () {
        setActiveClass(filterForm, control)
        render(sortPhotos(control.id));
      })
    }
  }

  var addListener = function (container) {
    var pictures = container.querySelectorAll('.picture');

    for (let picture of pictures) {
      picture.addEventListener('click', previewPictureClickHandler);
    };
  }

  var removePictures = function () {
    var pictures = document.querySelectorAll('.picture');

    for (let picture of pictures) {
      if (picture.parentNode) {
        picture.parentNode.removeChild(picture);
      }
    };
  }

  var render = function (photos) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < photos.length; i++) {
      removePictures();
      fragment.appendChild(createDomElements(photos[i]));
    }

    blockPictures.appendChild(fragment);
    addListener(blockPictures);
  }

  var successLoadDataHandler = function (photos) {
    allPhotos = photos;
    render(allPhotos);
    update();
    filter.classList.remove('img-filters--inactive');
  };

  var errorLoadDataHandler = function (message) {
    window.alerts.create(message)
  };

  window.backend.load(successLoadDataHandler, errorLoadDataHandler);

  var previewPictureClickHandler = function (evt) {
    var node = evt.currentTarget.querySelector('.picture__img');
    allPhotos.forEach(function(item, index) {
      if (node.src.split('/').slice(-2).join('/') === allPhotos[index].url) {
        window.preview.openPicture(item);
      }
    })
  };
})();
