'use strict';

(function () {
  var DEFAULT_EFFECT_VALUE = 100;

  var imageEditingForm = document.querySelector('.img-upload__overlay');
  var effectScaleLevel = imageEditingForm.querySelector('.effect-level__line');
  var effectLevelValue = imageEditingForm.querySelector('.effect-level__value');
  var effectLevelPin = imageEditingForm.querySelector('.effect-level__pin');
  var effectLevelDepth = imageEditingForm.querySelector('.effect-level__depth');

  effectLevelPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var effectScaleLevelWidth = effectScaleLevel.offsetWidth;
    var startCoords = {
      x: evt.clientX,
    };

    var mouseMoveHandler = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
      };

      var pinX = effectLevelPin.offsetLeft - shift.x;

      startCoords = {
        x: moveEvt.clientX,
      };

      if (!(pinX < 0 || pinX > effectScaleLevelWidth)) {
        var pin = pinX / effectScaleLevelWidth;
        effectLevelPin.style.left = pinX + 'px';
        effectLevelValue.value = Math.round(pin * DEFAULT_EFFECT_VALUE);
        effectLevelDepth.style.width = Math.round(pin * DEFAULT_EFFECT_VALUE) + '%';
        window.effects.setValue(effectLevelValue.value);
      }
    };

    var mouseUpHandler = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
    };

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
  });
})();
