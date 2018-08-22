import { ROOT_NAME, INTERNAL_VAR_NAME as m } from './constants';
import Component from './component/Component';
import generateScope from './component/generateScope';
import addStyles from './dom/addStyles';
import emitMount from './component/emitMount';
import setProps from './component/setProps';
import generateId from './utils/generateId';

let scope = generateScope(ROOT_NAME);

export default class Modeste extends Component {
  constructor(manifest, props) {
    super({
      name: ROOT_NAME,
      id: generateId(),
      manifest,
      props,
      scope
    });

    this[m].parent = null;
    this[m].isApp = true;

    if (manifest.style) addStyles(manifest.style(), scope);
    this[m].wrap = manifest.selector
      ? document.querySelector(manifest.selector)
      : null;

    this.$render();
  }

  get $wrap() {
    return this[m].wrap;
  }

  set $props(props) {
    setProps(this, props);
  }

  $render() {
    super.$render();

    if (!this[m].render) return;
    if (!this[m].mounted && !this[m].wrap) return emitMount(this);
    if (this[m].wrap) {
      while (this[m].wrap.firstChild)
        this[m].wrap.removeChild(this[m].wrap.firstChild);

      this[m].wrap.appendChild(this[m].dom);
      emitMount(this);
    }
  }
}
