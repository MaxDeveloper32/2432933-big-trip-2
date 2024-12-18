import BaseView from '../render';
import { POINT_TYPES, CITIES } from '../const';
import { findByKey } from '../utils/utils';

const createTypesEventTemplate = () => POINT_TYPES.map((type)=> `<div class="event__type-item">
<input id="event-type-${type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}">
<label class="event__type-label  event__type-label--${type}" for="event-type-${type}-1">${type}</label>
</div> `).join('');

const createCitiesTemplate = () => CITIES.map((city) => `<option value="${city}"></option>`).join('');

const renderOffersSelector = (offers, isChecked) => {
  const { id, title, price } = offers;

  return `
    <div class="event__offer-selector">
        <input class="event__offer-checkbox visually-hidden" id="offer-${id}" type="checkbox" name="event-offer-${id}" ${isChecked ? 'checked' : ''}>
        <label class="event__offer-label" for="offer-${id}">
            <span class="event__offer-title">${title}</span>
            &plus;&euro;&nbsp;
            <span class="event__offer-price">${price}</span>
        </label>
    </div>
`;
};

const createOffersSection = (mockPoint, mockOffers) => {
  const { offers } = mockOffers;

  const offersSelector = offers.map((offer) => renderOffersSelector(offer, mockPoint.offers.includes(offer.id))).join('');

  return `
        <section class="event__section event__section--offers">
            <h3 class="event__section-title event__section-title--offers">Offers</h3>
            <div class="event__available-offers">
                ${offersSelector}
            </div>
        </section>
    `;
};

const createOffersTemplate = (mockPoint, mockOffers) => {
  const pointTypeOffer = findByKey(mockOffers, 'type', mockPoint.type);
  return pointTypeOffer ? createOffersSection(mockPoint, pointTypeOffer) : '';
};

const createDescriptionSection = (mockDestinations) => {
  const { description, pictures } = mockDestinations;

  return `
  <section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      <p class="event__destination-description">${description}</p>
      <div class="event__photos-container">
          <div class="event__photos-tape">
              ${pictures.map((picture) => `
                  <img class="event__photo" src="${picture.src}" alt="${picture.description}">
              `).join('')}
          </div>
      </div>
  </section>`;
};

const createDestinationsTemplate = (mockPoint, mockDestinations) => {
  //const selectedDestination = mockDestinations.find((destination) => destination.id === mockPoint.destination);
  const selectedDestination = findByKey(mockDestinations, 'id', mockPoint.destination);
  return selectedDestination ? createDescriptionSection(selectedDestination) : '';
};

const createFormEditTemplate = (point, offers, destinations) => {
  const { type, basePrice } = point;

  const typesEventTemplate = createTypesEventTemplate();
  const citiesTemplate = createCitiesTemplate();
  const offersTemplate = createOffersTemplate(point, offers);
  const destinationsTemplate = createDestinationsTemplate(point, destinations);
  const questCoincidence = findByKey(destinations, 'id', point.destination) || '';

  return (
    `<li class="trip-events__item">
<form class="event event--edit" action="#" method="post">
  <header class="event__header">
    <div class="event__type-wrapper">
      <label class="event__type  event__type-btn" for="event-type-toggle-1">
        <span class="visually-hidden">Choose event type</span>
        <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
      </label>
      <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

      <div class="event__type-list">
        <fieldset class="event__type-group">
          <legend class="visually-hidden">Event type</legend>
          ${typesEventTemplate}
        </fieldset>
      </div>
    </div>

    <div class="event__field-group  event__field-group--destination">
      <label class="event__label  event__type-output" for="event-destination-1">
          ${type}
      </label>
      <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${questCoincidence.name}" list="destination-list-1">
      <datalist id="destination-list-1">
        ${citiesTemplate}
       </datalist>
    </div>

    <div class="event__field-group  event__field-group--time">
      <label class="visually-hidden" for="event-start-time-1">From</label>
      <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="18/03/19 12:25">
      &mdash;
      <label class="visually-hidden" for="event-end-time-1">To</label>
      <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="18/03/19 13:35">
    </div>

    <div class="event__field-group  event__field-group--price">
      <label class="event__label" for="event-price-1">
        <span class="visually-hidden">Price</span>
        &euro;
      </label>
      <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}">
    </div>

    <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
    <button class="event__reset-btn" type="reset">Delete</button>
    <button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
    </button>
  </header>
  <section class="event__details"> ${offersTemplate} ${destinationsTemplate} </section>
</form>
</li>
  `);
};

export default class EditFormtView extends BaseView{
  constructor({ point, offers, destinations }){
    super();
    this.point = point;
    this.offers = offers;
    this.destinations = destinations;
  }

  get template() {
    return createFormEditTemplate(this.point, this.offers, this.destinations);
  }
}
