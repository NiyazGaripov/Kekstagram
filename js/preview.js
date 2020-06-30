'use strict';

(function () {
  var body = document.querySelector('body');
  var previewPicture = document.querySelector('.big-picture');
  var bigPicture = previewPicture.querySelector('.big-picture__img img');
  var likesCount = previewPicture.querySelector('.likes-count');
  var commentsCount = previewPicture.querySelector('.comments-count');
  var socialComments = previewPicture.querySelector('.social__comments');
  var socialComment = socialComments.querySelector('.social__comment');
  var socialCaption = previewPicture.querySelector('.social__caption');
  var socialCommentCount = previewPicture.querySelector('.social__comment-count');
  var commentsLoader = previewPicture.querySelector('.comments-loader');

  body.classList.add('modal-open');

  var showElement = function (element) {
    element.classList.remove('hidden');
  };

  showElement(previewPicture);

  var hideElement = function (element) {
    element.classList.add('hidden');
  };

  hideElement(socialCommentCount);
  hideElement(commentsLoader);
})();
