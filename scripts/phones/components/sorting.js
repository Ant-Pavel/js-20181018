
import Component from '../../shared/component.js';

export default class Sorting extends Component {

constructor({element}) {
  super({element});

  this._render();

  this.on('change', '[data-element="sorting"]', (event) => {
    let target = event.delegateTarget;
    this._trigger('changeSort', {sortField: target.value, sortType: target.dataset.sortType });
  });
}

_render() {
    this._element.innerHTML = `
      Sort by:
      <select data-element="sorting">
        <option value="name" data-sort-type="string">Alphabetical</option>
        <option value="age" data-sort-type="number">Newest</option>
      </select>`;
  }
}