'use strict';

(function () {
  var DEFAULT_EFFECT_VALUE = 100;

  var imageEditingForm = document.querySelector('.img-upload__overlay');
  var imageUploadPreview = imageEditingForm.querySelector('.img-upload__preview img');
  var effectLevelValue = imageEditingForm.querySelector('.effect-level__value');
  var effectLevelPin = imageEditingForm.querySelector('.effect-level__pin');
  var effectLevelDepth = imageEditingForm.querySelector('.effect-level__depth');


  var setDefaultValue = function () {
    effectLevelValue.value = DEFAULT_EFFECT_VALUE;
    effectLevelPin.style.left = DEFAULT_EFFECT_VALUE + '%';
    effectLevelDepth.style.width = DEFAULT_EFFECT_VALUE + '%';
    imageUploadPreview.style.filter = '';
  };

  var removeClass = function (element) {
    element.className = '';
  };

  var showElement = function (element) {
    element.classList.remove('hidden');
  };

  var hideElement = function (element) {
    element.classList.add('hidden');
  };

  window.utils = {
    setDefaultValue: setDefaultValue,
    removeClass: removeClass,
    showElement: showElement,
    hideElement: hideElement,
  };
})();
