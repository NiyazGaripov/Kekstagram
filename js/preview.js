'use strict';

(function () {
  var ESC_KEY = 'Escape';
  var ENTER_KEY = 'Enter';

  var body = document.querySelector('body');
  var galleryContainer = document.querySelector('.pictures');
  var pictureCollections = galleryContainer.querySelectorAll('.picture__img');
  var previewPicture = document.querySelector('.big-picture');
  var bigPicture = previewPicture.querySelector('.big-picture__img img');
  var likesCount = previewPicture.querySelector('.likes-count');
  var commentsCount = previewPicture.querySelector('.comments-count');
  var socialComments = previewPicture.querySelector('.social__comments');
  var socialComment = socialComments.querySelector('.social__comment');
  var socialCaption = previewPicture.querySelector('.social__caption');
  var socialCommentCount = previewPicture.querySelector('.social__comment-count');
  var commentsLoader = previewPicture.querySelector('.comments-loader');

  var previewPictureClose = previewPicture.querySelector('#picture-cancel');

  var showElement = function (element) {
    element.classList.remove('hidden');
  };

  var hideElement = function (element) {
    element.classList.add('hidden');
  };

  var removeElement = function (element) {
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
  };

  var cloneComment = function (element) {
    var cloneElement = socialComment.cloneNode(true);

    cloneElement.querySelector('.social__picture').src = element.avatar;
    cloneElement.querySelector('.social__picture').alt = element.name;
    cloneElement.querySelector('.social__text').textContent = element.message;

    return cloneElement;
  };

  var renderComments = function (array) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < array.length; i++) {
      fragment.appendChild(cloneComment(array[i]));
    }

    return fragment;
  };

  var fillPictureInfo = function (item) {
    var commentsFragment = renderComments(item.comments);

    bigPicture.src = item.url;
    likesCount.textContent = item.likes;
    commentsCount.textContent = item.comments.length;
    socialCaption.textContent = item.description;

    socialComments.appendChild(commentsFragment);
  };

  var closePreviewPicture = function () {
    previewPictureClose.removeEventListener('click', buttonCloseClickHandler);
    document.removeEventListener('keydown', previewPictureEscHandler);
    hideElement(previewPicture);
    body.classList.remove('modal-open');
  };

  var previewPictureEscHandler = function (evt) {
    if (evt.key === ESC_KEY) {
      closePreviewPicture();
    }
  };

  var buttonCloseClickHandler = function () {
    closePreviewPicture();
  };

  var openPreviewPicture = function (item) {
    showElement(previewPicture);
    body.classList.add('modal-open');
    removeElement(socialComments);
    hideElement(socialCommentCount);
    hideElement(commentsLoader);
    fillPictureInfo(window.gallery.photos[item]);

    previewPictureClose.addEventListener('click', buttonCloseClickHandler);
    document.addEventListener('keydown', previewPictureEscHandler);
  };

  var previewPictureClickHandler = function (evt) {
    for (var i = 0; i < pictureCollections.length; i++) {
      if (evt.target === pictureCollections[i]) {
        openPreviewPicture(i);
      }
    }
  };

  var previewPictureKeyDownHandler = function (evt) {
    if (evt.key === ENTER_KEY) {
      for (var i = 0; i < pictureCollections.length; i++) {
        var current = evt.target.querySelector('.picture__img');
        if (current === pictureCollections[i]) {
          openPreviewPicture(i);
        }
      }
    }
  };

  galleryContainer.addEventListener('click', previewPictureClickHandler);
  galleryContainer.addEventListener('keydown', previewPictureKeyDownHandler);
})();
