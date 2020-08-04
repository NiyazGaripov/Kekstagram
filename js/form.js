'use strict';

(function () {
  var ESC_KEY = 'Escape';
  var DEFAULT_EFFECT_VALUE = 100;

  var body = document.querySelector('body');
  var uploadFile = document.querySelector('#upload-file');
  var form = document.querySelector('.img-upload__form');
  var imageEditingForm = form.querySelector('.img-upload__overlay');
  var imageUploadPreview = imageEditingForm.querySelector('.img-upload__preview img');
  var effectFieldset = imageEditingForm.querySelector('.effect-level');
  var imageEditingFormClose = imageEditingForm.querySelector('#upload-cancel');
  var inputHashtags = imageEditingForm.querySelector('.text__hashtags');
  var textareaDesc = imageEditingForm.querySelector('.text__description');
  var effectNone = imageEditingForm.querySelector('[id=effect-none]');
  var successAlertTemplate = document.querySelector('#success');
  var successAlert = successAlertTemplate.content.querySelector('.success');
  var successButton = successAlert.querySelector('.success__button');
  var errorAlertTemplate = document.querySelector('#error');
  var errorAlert = errorAlertTemplate.content.querySelector('.error');
  var errorButton = successAlert.querySelector('.error__button');

  var resetFormData = function () {
    uploadFile.value = '';
    effectFieldset.classList.add('hidden');
    effectNone.checked = true;
    inputHashtags.value = '';
    textareaDesc.value = '';
    window.scale.setValueImage(DEFAULT_EFFECT_VALUE);
    window.utils.setDefaultValue();
    window.utils.removeClass(imageUploadPreview);
  };

  var openImageEditingForm = function () {
    window.utils.showElement(imageEditingForm);
    body.classList.add('modal-open');
    imageEditingFormClose.addEventListener('click', buttonCloseClickHandler);
    document.addEventListener('keydown', imageEditingFormEscHandler);
    window.effects.addListeners();
    inputHashtags.addEventListener('input', window.validation.hashtagCheckHandler);
    textareaDesc.addEventListener('input', window.validation.textareaCheckHandler);
  };

  var closeImageEditingForm = function () {
    imageEditingForm.classList.add('hidden');
    body.classList.remove('modal-open');
    imageEditingFormClose.removeEventListener('click', buttonCloseClickHandler);
    document.removeEventListener('keydown', imageEditingFormEscHandler);
    window.effects.removeListeners();
    inputHashtags.removeEventListener('input', window.validation.hashtagCheckHandler);
    textareaDesc.removeEventListener('input', window.validation.textareaCheckHandler);
    resetFormData();
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

  var buttonCloseAlertHandler = function () {
    closeAlert();
  };

  var alertEscHandler = function (evt) {
    if (evt.key === ESC_KEY) {
      closeAlert();
    }
  };

  var dismissAlertClickHandler = function (evt) {
    if (evt.target === successAlert || evt.target === errorAlert) {
      closeAlert();
    }
  };

  var openAlert = function (alert, element) {
    window.alerts.render(alert);
    element.addEventListener('click', buttonCloseAlertHandler);
    document.addEventListener('keydown', alertEscHandler);
    alert.addEventListener('click', dismissAlertClickHandler);
  };

  var closeAlert = function () {
    window.alerts.remove(successAlert);
    window.alerts.remove(errorAlert);
  };

  var successUploadDataHandler = function () {
    closeImageEditingForm();
    openAlert(successAlert, successButton);
  };

  var errorUploadDataHandler = function () {
    openAlert(errorAlert, errorButton);
  };

  form.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(form), successUploadDataHandler, errorUploadDataHandler);
    evt.preventDefault();

  });
})();
