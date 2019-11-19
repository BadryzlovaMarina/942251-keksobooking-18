'use strict';

(function () {

  var IMAGES_FORMATS = ['gif', 'jpg', 'jpeg', 'png', 'svg', 'webp'];

  var HousingImgAttributes = {
    ALT: 'Фотография жилья',
    WIDTH: 70,
    HEIGHT: 70
  };

  var avatarUploaderElement = window.form.adForm.querySelector('.ad-form-header__input');
  var avatarPreviewElement = window.form.adForm.querySelector('.ad-form-header__preview img');
  var defaultAvatarPreview = avatarPreviewElement.src;
  var housingUploaderElement = window.form.adForm.querySelector('.ad-form__input');
  var housingImgElement = window.form.adForm.querySelector('.ad-form__photo');
  var housingImg = document.createElement('img');

  housingImg.alt = HousingImgAttributes.ALT;
  housingImg.width = HousingImgAttributes.WIDTH;
  housingImg.height = HousingImgAttributes.HEIGHT;

  var onAvatarUpload = function (uploader, preview) {
    var avatar = uploader.files[0];

    if (avatar) {
      var fileName = avatar.name.toLowerCase();

      var matches = IMAGES_FORMATS.some(function (it) {
        return fileName.endsWith(it);
      });

      if (matches) {
        var avatarReader = new FileReader();

        if (preview.tagName.toLowerCase() === 'img') {
          avatarReader.addEventListener('load', function () {
            preview.src = avatarReader.result;
          });
        } else {
          preview.insertAdjacentElement('afterbegin', housingImg);

          avatarReader.addEventListener('load', function () {
            housingImg.src = avatarReader.result;
          });
        }

        avatarReader.readAsDataURL(avatar);
      }
    }
  };

  avatarUploaderElement.addEventListener('change', function () {
    onAvatarUpload(avatarUploaderElement, avatarPreviewElement);
  });

  housingUploaderElement.addEventListener('change', function () {
    onAvatarUpload(housingUploaderElement, housingImgElement);
  });

  var resetUploadedImg = function () {
    avatarPreviewElement.src = defaultAvatarPreview;
    housingImg.remove();
  };

  window.photo = {
    resetUploadedImg: resetUploadedImg
  };

})();
