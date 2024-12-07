import BaseView from '../render';

const renderOffer = (offer) => {
  const { title, price} = offer;
  return `<li class="event__offer">
                <span class="event__offer-title">${title}</span> &plus;&euro;&nbsp;
                <span class="event__offer-price">${price}</span>
              </li>`;
};

const createOffersTemplate = (mockPoint, mockOffers) => {
  const pointTypeOffer = mockOffers.find((offer) => offer.type === mockPoint.type) || { offers: [] };
  const pointeOfferKey = new Set(mockPoint.offers);

  return pointTypeOffer.offers
    .filter((offer) => pointeOfferKey.has(offer.id))
    .map((offer) => renderOffer(offer))
    .join('');
};

const createRoutePoint = (point, offers) =>{
  const { type, basePrice, isFavorite } = point;
  //console.log(point);

  const favoriteClassName = isFavorite ? 'event__favorite-btn--active' : '';
  const offersItem = createOffersTemplate(point, offers);

  return (
    `<li class="trip-events__item">
              <div class="event">
                <time class="event__date" datetime="2019-03-18">MAR 18</time>
                <div class="event__type">
                  <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
                </div>
                <h3 class="event__title">${type} Chamonix</h3>
                <div class="event__schedule">
                  <p class="event__time">
                    <time class="event__start-time" datetime="2019-03-18T14:30">14:30</time>
                    &mdash;
                    <time class="event__end-time" datetime="2019-03-18T16:05">16:05</time>
                  </p>
                  <p class="event__duration">01H 35M</p>
                </div>
                <p class="event__price">
                  &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
                </p>
                <h4 class="visually-hidden">Offers:</h4>
                <ul class="event__selected-offers">
                     ${offersItem}
                </ul>
                <button class="event__favorite-btn  ${favoriteClassName}" type="button">
                  <span class="visually-hidden">Add to favorite</span>
                  <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
                    <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
                  </svg>
                </button>
                <button class="event__rollup-btn" type="button">
                  <span class="visually-hidden">Open event</span>
                </button>
              </div>
            </li>`
  );

};


export default class EventItemView extends BaseView {
  constructor({ point, offers}) {
    super();
    this.point = point;
    this.offers = offers;
  }

  get template() {
  // console.log(this.point);

    return createRoutePoint(this.point, this.offers);
  }
}

