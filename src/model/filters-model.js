import Observable from '../framework/observable.js';
import { DEFAULT_FILTER_TYPE } from '../const.js';

export default class FiltersModel extends Observable {
  #currentFilter = DEFAULT_FILTER_TYPE;

  get currentFilter() {
    return this.#currentFilter;
  }

  setFilter(updateType, filter) {
    this.#currentFilter = filter;
    this._notify(updateType, filter);
  }
}

