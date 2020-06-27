'use strict';

(function () {
  var ESC_KEY = 'Escape';

  var body = document.querySelector('body');
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
    window.effects.addListeners();
  };

  var closeImageEditingForm = function () {
    imageEditingForm.classList.add('hidden');
    body.classList.remove('modal-open');
    imageEditingFormClose.removeEventListener('click', buttonCloseClickHandler);
    document.removeEventListener('keydown', imageEditingFormEscHandler);
    uploadFile.value = '';
    window.effects.removeListeners();
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
})();
