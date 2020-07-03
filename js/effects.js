'use strict';

(function () {
  var DEFAULT_EFFECT_VALUE = 100;
  var GRAYSCALE_MAX_VALUE = 1;
  var SEPIA_MAX_VALUE = 1;
  var INVERT_MAX_VALUE = 100;
  var BLUR_MAX_VALUE = 3;
  var BRIGHTNESS_MIN_VALUE = 1;
  var BRIGHTNESS_MAX_VALUE = 3;

  var imageEditingForm = document.querySelector('.img-upload__overlay');
  var imageUploadPreview = imageEditingForm.querySelector('.img-upload__preview img');
  var effectFieldset = imageEditingForm.querySelector('.effect-level');
  var effectLevelValue = imageEditingForm.querySelector('.effect-level__value');
  var effectLevelPin = imageEditingForm.querySelector('.effect-level__pin');
  var effectLevelDepth = imageEditingForm.querySelector('.effect-level__depth');
  var effectNone = imageEditingForm.querySelector('[id=effect-none]');
  var effectChrome = imageEditingForm.querySelector('[id=effect-chrome]');
  var effectSepia = imageEditingForm.querySelector('[id=effect-sepia]');
  var effectMarvin = imageEditingForm.querySelector('[id=effect-marvin]');
  var effectPhobos = imageEditingForm.querySelector('[id=effect-phobos]');
  var effectHeat = imageEditingForm.querySelector('[id=effect-heat]');

  var removeClass = function (element) {
    element.className = '';
  };

  var setDefaultEffectValue = function () {
    effectLevelValue.value = DEFAULT_EFFECT_VALUE;
    effectLevelPin.style.left = DEFAULT_EFFECT_VALUE + '%';
    effectLevelDepth.style.width = DEFAULT_EFFECT_VALUE + '%';
    imageUploadPreview.style.filter = '';
  };

  var setClassByEffect = function (evt) {
    var effectName = evt.target.value;
    removeClass(imageUploadPreview);
    if (effectName !== 'none') {
      imageUploadPreview.classList.add('effects__preview--' + effectName);
      effectFieldset.classList.remove('hidden');
      setDefaultEffectValue();
    } else {
      removeClass(imageUploadPreview);
      effectFieldset.classList.add('hidden');
      imageUploadPreview.style.filter = '';
    }
  };

  var addListeners = function () {
    effectNone.addEventListener('click', setClassByEffect);
    effectChrome.addEventListener('click', setClassByEffect);
    effectSepia.addEventListener('click', setClassByEffect);
    effectMarvin.addEventListener('click', setClassByEffect);
    effectPhobos.addEventListener('click', setClassByEffect);
    effectHeat.addEventListener('click', setClassByEffect);
  };

  var removeListeners = function () {
    effectNone.removeEventListener('click', setClassByEffect);
    effectChrome.removeEventListener('click', setClassByEffect);
    effectSepia.removeEventListener('click', setClassByEffect);
    effectMarvin.removeEventListener('click', setClassByEffect);
    effectPhobos.removeEventListener('click', setClassByEffect);
    effectHeat.removeEventListener('click', setClassByEffect);
  };

  var getValueRange = function (value, min, max) {
    return value * (max - min) + min;
  };

  var setValue = function (value) {
    var prop = value / 100;
    var effectClasses = Array.from(imageUploadPreview.classList);

    for (var i = 0; i < effectClasses.length; i++) {
      if (effectClasses[i].match('effects__preview--')) {
        switch (effectClasses[i]) {
          case 'effects__preview--chrome':
            imageUploadPreview.style.filter = 'grayscale(' + (GRAYSCALE_MAX_VALUE * prop) + ')';
            break;
          case 'effects__preview--sepia':
            imageUploadPreview.style.filter = 'sepia(' + (SEPIA_MAX_VALUE * prop) + ')';
            break;
          case 'effects__preview--marvin':
            imageUploadPreview.style.filter = 'invert(' + (INVERT_MAX_VALUE * prop) + '%)';
            break;
          case 'effects__preview--phobos':
            imageUploadPreview.style.filter = 'blur(' + (BLUR_MAX_VALUE * prop) + 'px)';
            break;
          case 'effects__preview--heat':
            imageUploadPreview.style.filter = 'brightness(' + getValueRange(prop, BRIGHTNESS_MIN_VALUE, BRIGHTNESS_MAX_VALUE) + ')';
            break;
          default:
            imageUploadPreview.style.filter = '';
        }
      }
    }
  };

  window.effects = {
    addListeners: addListeners,
    removeListeners: removeListeners,
    setValue: setValue,
  };
})();
