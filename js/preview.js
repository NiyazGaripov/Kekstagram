'use strict';

(function () {
  var ESC_KEY = 'Escape';

  var body = document.querySelector('body');
  var pictures = document.querySelectorAll('.picture');
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

  var fillPictureInfo = function (array) {
    var commentsFragment = renderComments(array.comments);

    bigPicture.src = array.url;
    likesCount.textContent = array.likes;
    commentsCount.textContent = array.comments.length;
    socialCaption.textContent = array.description;

    removeElement(socialComments);
    hideElement(socialCommentCount);
    hideElement(commentsLoader);
    socialComments.appendChild(commentsFragment);
  };

  fillPictureInfo(window.gallery.photos[0]);

  var previewPictureEscHandler = function (evt) {
    if (evt.key === ESC_KEY) {
      closePreviewPicture();
    }
  };

  var buttonCloseClickHandler = function () {
    closePreviewPicture();
  };

  var openPreviewPicture = function () {
    for (var i = 0; i < pictures.length; i++) {
      pictures[i].addEventListener('click', function () {
        showElement(previewPicture);
        body.classList.add('modal-open');
      });
    }
    previewPictureClose.addEventListener('click', buttonCloseClickHandler);
    document.addEventListener('keydown', previewPictureEscHandler);
  };

  openPreviewPicture();

  var closePreviewPicture = function () {
    hideElement(previewPicture);
    body.classList.remove('modal-open');
  };
})();
