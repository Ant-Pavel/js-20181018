import Component from '../../shared/component.js';

export default class PhoneCatalog extends Component {
  constructor({ element }) {
    super({ element });

    this.on('click', '[data-element="phone-link"]', event => this._onPhoneClick(event));
    this.on('click', '[data-element="button-add"]', event => {
      let phoneItem = event.delegateTarget.closest('li');

      this._trigger('add', phoneItem.dataset.phoneId);
    });

    this._INITIAL_SORT_VALUE = 'name';
    this._INITIAL_SORT_TYPE = 'string';
  }

  _onPhoneClick(event) {
    let phoneLink = event.delegateTarget;
    this._trigger('phoneSelected', { phoneId: phoneLink.dataset.phoneId });
  }

  showPhones(phones) {
    this._phones = phones;
    this._render();
    this.show();
  }

  sortPhones({sortValue = this._INITIAL_SORT_VALUE, sortType = this._INITIAL_SORT_TYPE} = {}) {
    let { _phones: phones } = this;

    phones.sort((a, b)=> {

      if(sortType === "number") {
        a[sortValue] = +a[sortValue];
        b[sortValue] = +b[sortValue];
      }

      return a[sortValue] > b[sortValue] ? 1 : -1;
    });

    this._render();
  }

  searchPhones(needle) {
    needle = needle.trim();
    if (needle.length) {
      this._searchResults = this._phones.filter((phone) => {
        return phone.name.toLowerCase().includes(needle.toLowerCase());
      });
    } else {
      this._searchResults = null;
    }
    this._render();
  }

  _render() {
    this._element.innerHTML = `
       <ul class="phones">
          ${ (this._searchResults || this._phones).map(phone => `
            <li class="thumbnail" data-phone-id="${phone.id}">
              <a data-element="phone-link" data-phone-id="${phone.id}" href="#!/phones/${phone.id}" class="thumb">
                  <img alt="${phone.name}" src="${phone.imageUrl}">
              </a>

              <div class="phones__btn-buy-wrapper">
                  <a class="btn btn-success" data-element="button-add">
                      Add
                  </a>
              </div>

              <a data-element="phone-link" data-phone-id="${phone.id}" href="#!/phones/${phone.id}">${phone.name}</a>
              <p>${phone.snippet}</p>
          </li>
          `).join('')}
        </ul>
    `;
  }
}
