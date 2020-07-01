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

  var previewPictureClose = previewPicture.querySelector('.cancel');

  var showElement = function (element) {
    element.classList.remove('hidden');
  };

  var hideElement = function (element) {
    element.classList.add('hidden');
  };

  hideElement(socialCommentCount);
  hideElement(commentsLoader);

  var fillPictureInfo = function (array) {
    bigPicture.src = array.url;
    likesCount.textContent = array.likes;
    commentsCount.textContent = array.comments.length;
    socialCaption.textContent = array.description;

    return array;
  };

  var removeElement = function (element) {
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
  };

  removeElement(socialComments);

  var cloneComment = function (element) {
    var cloneElement = socialComment.cloneNode(true);

    cloneElement.querySelector('.social__picture').src = element.avatar;
    cloneElement.querySelector('.social__picture').alt = element.name;
    cloneElement.querySelector('.social__text').textContent = element.message;

    return cloneElement;
  };

  var renderComments = function () {
    var fragment = document.createDocumentFragment();
    var firstElement = fillPictureInfo(window.gallery.photos[0]);

    for (var i = 0; i < firstElement.comments.length; i++) {
      fragment.appendChild(cloneComment(firstElement.comments[i]));
    }

    socialComments.appendChild(fragment);
  };

  renderComments();

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
