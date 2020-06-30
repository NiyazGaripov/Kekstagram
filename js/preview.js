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

  var fillPictureInfo = function (array) {
    bigPicture.src = array.url;
    likesCount.textContent = array.likes;
    commentsCount.textContent = array.comments.length;
    socialCaption.textContent = array.description;
  };

  fillPictureInfo(window.gallery.photos[0]);

  var cloneComment = function (element) {
    var cloneElement = socialComment.cloneNode(true);

    cloneElement.querySelector('.social__picture').src = element.avatar;
    cloneElement.querySelector('.social__picture').alt = element.name;
    cloneElement.querySelector('.social__text').textContent = element.message;

    return cloneElement;
  };

  var renderComments = function () {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < window.gallery.photos[0].comments.length; i++) {
      fragment.appendChild(cloneComment(window.gallery.photos[0].comments[i]));
    }

    socialComments.appendChild(fragment);
  };

  renderComments();
})();
