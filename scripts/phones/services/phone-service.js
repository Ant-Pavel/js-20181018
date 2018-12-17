import HttpService from '../../shared/services/http-service.js';

const PhoneService = {

  _INITIAL_SORT_VALUE: 'name',
  _INITIAL_SORT_TYPE: 'string',
  _currentSort: null,
  _currentSearch: null,

  getPhones({ search = this._currentSearch || '', sortField = this._currentSort || this._INITIAL_SORT_VALUE, sortType = this._INITIAL_SORT_TYPE } = {}) {

    this._currentSearch = search;
    this._currentSort = sortField;

    let promise = HttpService.sendRequest(`phones/phones.json`);

    return promise.then(phones => {
      let filteredPhones = this._filterPhones(phones, search);
      let sortedPhones = this._sortPhones(filteredPhones, sortField, sortType);

      return sortedPhones;
    })

  },

  _filterPhones(phones, search) {
    search = search.trim();
    if (search.length) {
      return phones.filter((phone) => {
        return phone.name.toLowerCase().includes(search.toLowerCase());
      });
    }

    return phones;
  },

  _sortPhones(phones, sortField, sortType) {
    return phones.sort((a, b) => {
      if(sortType === "number") {
        a[sortField] = +a[sortField];
        b[sortField] = +b[sortField];
      }
      return a[sortField] > b[sortField] ? 1 : -1;
    })
  },

  getPhone(phoneId) {
    return HttpService.sendRequest(`phones/${phoneId}.json`);
  },

}

export default PhoneService;
