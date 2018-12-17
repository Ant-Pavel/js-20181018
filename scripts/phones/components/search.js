
import Component from '../../shared/component.js';

export default class Search extends Component {

constructor({element}) {
  super({element});

  this._render();

  this._debouncedTrigger = debounce(this._trigger, 600);

  this.on('input', '[data-element="search-input"]', (event) => {
    this._debouncedTrigger('searchInput', { search: event.delegateTarget.value });
  });
}

_render() {
    this._element.innerHTML = `
        Search:
        <input data-element="search-input">`;
  }
}

function debounce(f, ms) {
  let timerId = null;
  return function(...args) {
    let context = this;
    clearTimeout(timerId);
    timerId = setTimeout(function() {
     f.apply(context, args); 
   }, ms);
  }
}