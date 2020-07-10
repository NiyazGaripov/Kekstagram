'use strict';

(function () {
  var ESC_KEY = 'Escape';
  var DEFAULT_EFFECT_VALUE = 100;

  var body = document.querySelector('body');
  var uploadFile = document.querySelector('#upload-file');
  var form = document.querySelector('.img-upload__form');
  var imageEditingForm = form.querySelector('.img-upload__overlay');
  var imageEditingFormClose = imageEditingForm.querySelector('#upload-cancel');
  var inputHashtags = imageEditingForm.querySelector('.text__hashtags');
  var textareaDesc = imageEditingForm.querySelector('.text__description');

  var openImageEditingForm = function () {
    imageEditingForm.classList.remove('hidden');
    body.classList.add('modal-open');
    imageEditingFormClose.addEventListener('click', buttonCloseClickHandler);
    document.addEventListener('keydown', imageEditingFormEscHandler);
    window.effects.addListeners();
  };

  var closeImageEditingForm = function () {
    imageEditingForm.classList.add('hidden');
    body.classList.remove('modal-open');
    imageEditingFormClose.removeEventListener('click', buttonCloseClickHandler);
    document.removeEventListener('keydown', imageEditingFormEscHandler);
    uploadFile.value = '';
    window.effects.removeListeners();
    window.scale.setValueImage(DEFAULT_EFFECT_VALUE);
  };

  var imageEditingFormEscHandler = function (evt) {
    if (evt.key === ESC_KEY &&
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

  var successUploadDataHandler = function () {
    closeImageEditingForm();
    window.alert.createElement();
  };

  var errorUploadDataHandler = function (message) {
    window.alert.createElement(message);
  };

  form.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(form), successUploadDataHandler, errorUploadDataHandler);
    evt.preventDefault();

  });
})();
