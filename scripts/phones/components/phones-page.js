'use strict';

import PhoneCatalog from './phone-catalog.js';
import PhoneViewer from './phone-viewer.js';
import ShoppingCart from './shopping-cart.js';
import Sorting from './sorting.js';
import Search from './search.js';

import PhoneService from '../services/phone-service.js';

export default class PhonesPage {
  constructor({ element }) {
    this._element = element;

    this._render();

    this._initCatalog();
    this._initViewer();
    this._initCart();
    this._initSorting();
    this._initSearch();

    PhoneService.getPhones((phones)=> {
      this._catalog.showPhones(phones);
      this._catalog.sortPhones();
    });
  }

  _initCatalog() {
    this._catalog = new PhoneCatalog({
      element: this._element.querySelector('[data-component="phone-catalog"]'),
    });

    this._catalog.on('phoneSelected', (event) => {
      PhoneService.getPhone(event.detail.phoneId, (phone) => {
        this._catalog.hide();
        this._viewer.showPhone(phone);
      });
    })

    this._catalog.on('add', (event) => {
      let phoneId = event.detail;
      this._cart.addItem(phoneId);
    })

  }

  _initViewer() {
    this._viewer = new PhoneViewer({
      element: this._element.querySelector('[data-component="phone-viewer"]'),
    })

    this._viewer.on('back', (event) => {
      this._viewer.hide();
      this._catalog.show();
    });

    this._viewer.on('add', (event)=> {
      let phoneId = event.detail;
      this._cart.addItem(phoneId);
    });
  }

  _initCart() {
    this._cart = new ShoppingCart({
      element: this._element.querySelector('[data-component="shopping-cart"]')
    })
  }

  _initSorting() {
    this._sorting = new Sorting({
      element: this._element.querySelector('[data-component="sorting"]'),
    });

    this._sorting.on('changeSort', (event) => {
      this._catalog.sortPhones(event.detail);
    });
  }

  _initSearch() {
    this._search = new Search({
      element: this._element.querySelector('[data-component="search"]'),
    });

    this._search.on('searchInput', (event)=> {
      this._catalog.searchPhones(event.detail);
    });
  }

  _render() {
    this._element.innerHTML = `
       <div class="row">
        <!--Sidebar-->
        <div class="col-md-2">
          <section>
            <p>
              <div data-component="search"></div>
            </p>

            <p>
              <div data-component="sorting"></div>
            </p>
          </section>

          <section>
              <div data-component="shopping-cart"></div>
          </section>
        </div>

        <!--Main content-->
        <div class="col-md-10">
           <div data-component="phone-catalog" class="js-hidden"></div>
           <div data-component="phone-viewer" class="js-hidden"></div>
        </div>
    </div>
    `;
  }
}
