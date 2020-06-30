'use strict';

(function () {
  var body = document.querySelector('body');
  var previewPicture = document.querySelector('.big-picture');
  var bigPicture = previewPicture.querySelector('.big-picture__img img');
  var likesCount = previewPicture.querySelector('.likes-count');
  var commentsCount = previewPicture.querySelector('.comments-count');
  var socialComments = previewPicture.querySelector('.social__comments');
  var socialCaption = previewPicture.querySelector('.social__caption');
  var socialCommentCount = previewPicture.querySelector('.social__comment-count');
  var commentsLoader = previewPicture.querySelector('.comments-loader');

  body.classList.add('modal-open');
  previewPicture.classList.remove('hidden');
  socialCommentCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');

  bigPicture.src = window.gallery.photos[0].url;
  likesCount.textContent = window.gallery.photos[0].likes;
  commentsCount.textContent = window.gallery.photos[0].comments.length;
})();
