'use strict';

var AMOUNT_PHOTOS = 25;

var DESCRIPTION_PHOTOS = [
  'Идём в поход',
  'Тренировка огонь',
  'HTML Academy',
  'Выступаем на конференции',
  'Тёплое море',
  'Очередное путешествие',
  'Чемпионат мира по самбо'
];

var COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

var NAMES = [
  'Сократ',
  'Рене',
  'Альберт',
  'Стивен',
  'Тим',
  'Илон',
];

var ESC_KEY = 27;

var photos = [];

var templatePicture = document.querySelector('#picture');
var linkPicture = templatePicture.content.querySelector('.picture');
var blockPictures = document.querySelector('.pictures');

var getRandomArrayElement = function (array) {
  return array[Math.floor(Math.random() * array.length)];
};

var getRandomIntInclusive = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var createComment = function () {
  var numberAvatar = getRandomIntInclusive(1, 6);

  var comment = {
    avatar: 'img/avatar-' + numberAvatar + '.svg',
    message: getRandomArrayElement(COMMENTS),
    name: getRandomArrayElement(NAMES),
  };

  return comment;
};

var getArrayComments = function () {
  var comments = [];
  var amountComments = getRandomIntInclusive(2, 10);

  for (var i = 0; i <= amountComments; i++) {
    comments.push(createComment());
  }

  return comments;
};

var createDescriptionPhoto = function (amount) {
  var descriptionPhoto = {
    url: 'img/photos/' + amount + '.jpg',
    description: getRandomArrayElement(DESCRIPTION_PHOTOS),
    likes: getRandomIntInclusive(15, 200),
    comments: getArrayComments(),
  };

  return descriptionPhoto;
};

var getArrayDescriptionPhotos = function () {
  for (var i = 0; i < AMOUNT_PHOTOS; i++) {
    photos.push(createDescriptionPhoto(i + 1));
  }

  return photos;
};

var createDomElements = function (element) {
  var domElements = linkPicture.cloneNode(true);

  domElements.querySelector('.picture__img').src = element.url;
  domElements.querySelector('.picture__likes').textContent = element.likes;
  domElements.querySelector('.picture__comments').textContent = element.comments.length;

  return domElements;
};

var renderDomElements = function () {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < AMOUNT_PHOTOS; i++) {
    fragment.appendChild(createDomElements(photos[i]));
  }
  blockPictures.appendChild(fragment);
};

getArrayDescriptionPhotos();
renderDomElements();

var body = document.querySelector('body');
var previewPicture = body.querySelector('.big-picture');

previewPicture.querySelector('.big-picture__img img').src = photos[0].url;
previewPicture.querySelector('.likes-count').textContent = photos[0].likes;
previewPicture.querySelector('.comments-count').textContent = photos[0].comments.length;
previewPicture.querySelector('.social__caption').textContent = photos[0].description;

var commentList = previewPicture.querySelector('.social__comments');
var commentItem = commentList.querySelector('.social__comment');

var createComment = function (element) {
  var comment = commentItem.cloneNode(true);

  comment.querySelector('.social__picture').src = element.avatar;
  comment.querySelector('.social__picture').alt = element.name;
  comment.querySelector('.social__text').textContent = element.message;

  return comment;
};

var socialCommentCount = previewPicture.querySelector('.social__comment-count');
var commentsLoader = previewPicture.querySelector('.comments-loader');

socialCommentCount.classList.add('hidden');
commentsLoader.classList.add('hidden');

var renderComments = function () {
  var fragment = document.createDocumentFragment();

  commentList.innerHTML = '';

  for (var i = 0; i < photos[0].comments.length; i++) {
    fragment.appendChild(createComment(photos[0].comments[i]));
  }
  commentList.appendChild(fragment);
};

renderComments();

var uploadFile = document.querySelector('#upload-file');
var imageEditingForm = document.querySelector('.img-upload__overlay');
var imageEditingFormClose = imageEditingForm.querySelector('#upload-cancel');
var inputHashtags = imageEditingForm.querySelector('.text__hashtags');
var textareaDesc = imageEditingForm.querySelector('.text__description');


var openImageEditingForm = function () {
  imageEditingForm.classList.remove('hidden');
  body.classList.add('modal-open');
  imageEditingFormClose.addEventListener('click', buttonCloseClickHandler);
  document.addEventListener('keydown', imageEditingFormEscHandler);
  effectNone.addEventListener('click', setClassByEffect);
  effectChrome.addEventListener('click', setClassByEffect);
  effectSepia.addEventListener('click', setClassByEffect);
  effectMarvin.addEventListener('click', setClassByEffect);
  effectPhobos.addEventListener('click', setClassByEffect);
  effectHeat.addEventListener('click', setClassByEffect);
};

var closeImageEditingForm = function () {
  imageEditingForm.classList.add('hidden');
  body.classList.remove('modal-open');
  imageEditingFormClose.removeEventListener('click', buttonCloseClickHandler);
  document.removeEventListener('keydown', imageEditingFormEscHandler);
  uploadFile.value = '';
  effectNone.removeEventListener('click', setClassByEffect);
  effectChrome.removeEventListener('click', setClassByEffect);
  effectSepia.removeEventListener('click', setClassByEffect);
  effectMarvin.removeEventListener('click', setClassByEffect);
  effectPhobos.removeEventListener('click', setClassByEffect);
  effectHeat.removeEventListener('click', setClassByEffect);
};


var imageEditingFormEscHandler = function (evt) {
  if (evt.keyCode === ESC_KEY &&
      inputHashtags !== document.activeElement &&
      textareaDesc !== document.activeElement) {
    closeImageEditingForm();
  }
};


var inputUploadClickHandler = function () {
  openImageEditingForm();
};

var buttonCloseClickHandler = function () {
  closeImageEditingForm();
};

uploadFile.addEventListener('change', inputUploadClickHandler);

var MAX_VALUE = 100;
var MIN_VALUE = 25;
var SCALE_STEP = 25;
var controlSmaller = imageEditingForm.querySelector('.scale__control--smaller');
var controlBigger = imageEditingForm.querySelector('.scale__control--bigger');
var controlValue = imageEditingForm.querySelector('.scale__control--value');
var imageUpload = imageEditingForm.querySelector('img');

var getIntegerFromString = function (element) {
  return parseInt(element.value, 10);
};

var setScaleValueImage = function (value) {
  if (value >= MIN_VALUE && value <= MAX_VALUE) {
    controlValue.value = value + '%';
    imageUpload.style.transform = 'scale(' + value / 100 + ')';
    imageUpload.style.transition = '0.4s';
  }

  return value;
};

var buttonScaleControlClickHandler = function (evt) {
  if (evt.target === controlSmaller) {
    setScaleValueImage(getIntegerFromString(controlValue) - SCALE_STEP);
  } else if (evt.target === controlBigger) {
    setScaleValueImage(getIntegerFromString(controlValue) + SCALE_STEP);
  }
};

controlSmaller.addEventListener('click', buttonScaleControlClickHandler);

controlBigger.addEventListener('click', buttonScaleControlClickHandler);

var imageUploadPreview = imageEditingForm.querySelector('.img-upload__preview img');
var effectScaleLevel = imageEditingForm.querySelector('.effect-level');
var effectLevelValue = imageEditingForm.querySelector('.effect-level__value');
var effectLevelPin = imageEditingForm.querySelector('.effect-level__pin');
var effectLevelDepth = imageEditingForm.querySelector('.effect-level__depth');
var effectNone = imageEditingForm.querySelector('[id=effect-none]');
var effectChrome = imageEditingForm.querySelector('[id=effect-chrome]');
var effectSepia = imageEditingForm.querySelector('[id=effect-sepia]');
var effectMarvin = imageEditingForm.querySelector('[id=effect-marvin]');
var effectPhobos = imageEditingForm.querySelector('[id=effect-phobos]');
var effectHeat = imageEditingForm.querySelector('[id=effect-heat]');

effectLevelPin.style.left = '100%';
effectLevelDepth.style.width = '100%';

var removeClass = function (element) {
  element.className = '';
};


var setClassByEffect = function (evt) {
  var effectName = evt.target.value;
  removeClass(imageUploadPreview);
  if (effectName !== 'none') {
    imageUploadPreview.classList.add('effects__preview--' + effectName);
    effectScaleLevel.classList.remove('hidden');
  } else {
    removeClass(imageUploadPreview);
    effectScaleLevel.classList.add('hidden');
  }
};

var MIN_LENGTH_HASHTAG = 2;
var MAX_LENGTH_HASHTAG = 20;
var MAX_AMOUNT_HASHTAG = 5;

var inputHashtagCheckHandler = function (evt) {
  var target = evt.target;
  var arrayHashtags = target.value.split(' ');
  var errorMessage = '';
  var regExpr = /(^)(#[a-zA-Zа-яА-Я\d]*$)/;
  var withoutHash = false;
  var invalidSymbols = false;
  var minLengthHashtag = false;
  var maxLengthHashtag = false;
  var repeat = false;
  var maxAmountHashtag = false;

  if (target.value === '') {
    target.setCustomValidity('');
    return;
  }
};
