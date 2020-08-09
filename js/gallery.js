'use strict';

(function () {
  var ENTER_KEY = 'Enter';
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
    DEFAULT: `filter-default`,
    RANDOM: `filter-random`,
    DISCUSSED: `filter-discussed`,
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
    var sortedPhotos = [];

    switch (type) {
      case SortType.DEFAULT:
        sortedPhotos = allPhotos;
        return sortedPhotos;
      case SortType.RANDOM:
        sortedPhotos = shuffle(allPhotos).slice(FIRST_INDEX, LAST_INDEX);
        return sortedPhotos
      case SortType.DISCUSSED:
        sortedPhotos = allPhotos.sort((a, b) => b.comments.length - a.comments.length);
        return sortedPhotos;
    }
  }

  var setActiveClass = (container, element) => {
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
        console.log(sortPhotos(control.id));
      })
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
    render(allPhotos);
    update();
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
