'use strict';

(function () {
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

  window.effects = {
    addListeners: addListeners,
    removeListeners: removeListeners,
  };
})();
