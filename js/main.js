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
