import Component from '../../shared/component.js';

export default class PhoneViewer extends Component {
  constructor({ element }) {
    super({ element });

    this.on('click', '[data-element="phone-gallery-item"]', this._onGalleryClick.bind(this) );


    this.on('click', '[data-element="button-back"]', (event) => {
      this._trigger('back');
    });

    this.on('click', '[data-element="button-add"]', (event) => {
      this._trigger('add', event.delegateTarget.dataset.phoneId);
    });
  }

  showPhone(phone) {
    this._phone = phone;

    this._currentBigImage = phone.images[0];

    this._render();
    super.show();
  }

  _onGalleryClick(event) {
    this._currentBigImage = event.delegateTarget.getAttribute('src');
    this._render();
  }

  _render() {
    const { _phone: phone } = this;

    this._element.innerHTML = `
      <img class="phone" src="${this._currentBigImage}">

    <button data-element="button-back">Back</button>
    <button data-element="button-add" data-phone-id="${phone.id}">Add to basket</button>


    <h1>${phone.name}</h1>

    <p>${phone.description}</p>

    <ul class="phone-thumbs">
        ${phone.images.map(imageSrc => `
          <li>
            <img src="${imageSrc}" data-element="phone-gallery-item">
          </li>
         `).join('')}
    </ul>
    `;
  }
}
