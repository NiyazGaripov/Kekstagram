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
  var amountComments = getRandomIntInclusive(2, 10);

  return new Array(amountComments)
    .fill('')
    .map(createComment);
};

var createDescriptionPhoto = function (amount) {
  var descriptionPhoto = {
    url: 'photos/' + amount + '.jpg',
    description: getRandomArrayElement(DESCRIPTION_PHOTOS),
    likes: getRandomIntInclusive(15, 200),
    comments: getArrayComments(),
  };
  return descriptionPhoto;
};

var getArrayDescriptionPhotos = function () {
  return new Array(AMOUNT_PHOTOS)
  .fill('')
  .map(createDescriptionPhoto);
};
