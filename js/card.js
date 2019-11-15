'use strict';

(function () {

  var cardTemplate = document.querySelector('#card')
      .content
      .querySelector('.map__card');

  var createFeature = function (feature) {
    var featureClass = '.popup__feature--' + feature;
    var featureTemplate = document.querySelector('#card').content.querySelector(featureClass);
    var element = featureTemplate.cloneNode();
    return element;
  };

  var createPhoto = function (photo) {
    var photoTemplate = document.querySelector('#card').content.querySelector('.popup__photos');
    var element = photoTemplate.cloneNode(true);
    element.querySelector('img').src = photo;
    return element;
  };

  var createList = function (element, list, offer) {
    var fragment = document.createDocumentFragment();
    element.innerHTML = '';
    for (var i = 0; i < list.length; i++) {
      var item = (offer === 'photos') ? createPhoto(list[i]) : createFeature(list[i]);
      fragment.appendChild(item);
    }
    element.appendChild(fragment);
  };

  var createCard = function (card) {
    var cardElement = cardTemplate.cloneNode(true);
    var featureElement = cardElement.querySelector('.popup__features');
    var featuresList = card.offer.features;
    var photoElement = cardElement.querySelector('.popup__photos');
    var photosList = card.offer.photos;
    cardElement.querySelector('.popup__title').textContent = card.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = card.location.x + ', ' + card.location.y;
    cardElement.querySelector('.popup__text--price').textContent = card.offer.price + '₽/ночь';
    cardElement.querySelector('.popup__type').textContent = window.data.housingTypePrice[card.offer.type].name;
    cardElement.querySelector('.popup__text--capacity').textContent = card.offer.rooms + ' комнаты для ' + card.offer.guests + ' гостей';
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.offer.checkin + ', Выезд до ' + card.offer.checkout;
    cardElement.querySelector('.popup__description').textContent = card.offer.description;
    cardElement.querySelector('.popup__avatar').src = card.author.avatar;
    createList(featureElement, featuresList, 'features');
    createList(photoElement, photosList, 'photos');
    return cardElement;
  };

  window.card = {
    createCard: createCard
  };

})();
