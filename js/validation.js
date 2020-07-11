'use strict';

(function () {
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

    for (var i = 0; i < arrayHashtags.length; i++) {
      if (arrayHashtags[i][0] !== '#') {
        withoutHash = true;
      }

      if (!regExpr.test(arrayHashtags[i])) {
        invalidSymbols = true;
      }

      if (arrayHashtags[i].length < MIN_LENGTH_HASHTAG) {
        minLengthHashtag = true;
      }

      if (arrayHashtags[i].length > MAX_LENGTH_HASHTAG) {
        maxLengthHashtag = true;
      }

      for (var j = i + 1; j < arrayHashtags.length; j++) {
        if (arrayHashtags[i].toLowerCase() === arrayHashtags[j].toLowerCase()) {
          repeat = true;
        }
      }
    }

    if (arrayHashtags.length > MAX_AMOUNT_HASHTAG) {
      maxAmountHashtag = true;
    }

    if (withoutHash) {
      errorMessage += ' Хэш-тег должен начинаться с символа решётка #!';
    }

    if (invalidSymbols) {
      errorMessage += ' Хэш-тег содержит недопустимые спецсимволы, символы пунктуации или эмодзи!';
    }

    if (minLengthHashtag) {
      errorMessage += ' Минимальная длина хэш-тега составляет ' + MIN_LENGTH_HASHTAG + ' символа!';
    }

    if (maxLengthHashtag) {
      errorMessage += ' Максимальная длина одного хэш-тега составляет' + MAX_LENGTH_HASHTAG + ' символов, включая решётку!';
    }

    if (repeat) {
      errorMessage += ' Поле содержит повторяющиеся хэш-теги!';
    }

    if (maxAmountHashtag) {
      errorMessage += ' Нельзя указывать более ' + MAX_AMOUNT_HASHTAG + ' хэш-тегов!';
    }

    target.setCustomValidity(errorMessage);
  };

  var inputTextareaCheckHandler = function (evt) {
    var target = evt.target;

    if (target.value.length > 140) {
      target.setCustomValidity('Длина комментария не может составлять больше 140 символов!');
    } else {
      target.setCustomValidity('');
    }
  };

  window.validation = {
    hashtagCheckHandler: inputHashtagCheckHandler,
    textareaCheckHandler: inputTextareaCheckHandler,
  };
})();
