'use strict';

(function () {
  var MAX_VALUE = 100;
  var MIN_VALUE = 25;
  var SCALE_STEP = 25;
  var imageEditingForm = document.querySelector('.img-upload__overlay');
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
})();
