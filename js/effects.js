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
  var effectScaleLevel = imageEditingForm.querySelector('.effect-level__line');
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
      effectFieldset.classList.remove('hidden');
    } else {
      removeClass(imageUploadPreview);
      effectFieldset.classList.add('hidden');
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

  var setDefaultEffectValue = function () {
    effectLevelValue.value = DEFAULT_EFFECT_VALUE;
    effectLevelPin.style.left = DEFAULT_EFFECT_VALUE + '%';
    effectLevelDepth.style.width = DEFAULT_EFFECT_VALUE + '%';
  };

  var setEffectValue = function (value) {
    var prop = value / 100;
    var effectClasses = Array.from(imageUploadPreview.classList);
  };

  effectLevelPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
    };

    var mouseMoveHandler = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
      };

      startCoords = {
        x: moveEvt.clientX,
      };

      effectLevelPin.style.left = (effectLevelPin.offsetLeft - shift.x) + 'px';
    };

    var mouseUpHandler = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
    };

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
  });

  window.effects = {
    addListeners: addListeners,
    removeListeners: removeListeners,
  };
})();
