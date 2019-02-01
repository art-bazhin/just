import { INTERNAL_VAR_NAME as m } from '../constants';
import emitHook from './emitHook';
import e from '../vDom/createElementNode';
import c from '../vDom/createComponentNode';
import createDom from '../dom/createDom';
import updateDom from '../dom/updateDom';
import ModesteError from '../utils/ModesteError';

export default function render(component) {
  if (!component[m].render) return;

  if (!component[m].mounted) emitHook(component, 'willMount');
  else emitHook(component, 'willRedraw');

  let vNode = component[m].render(e, c);

  if (typeof vNode !== 'object' || vNode.type !== 'element') {
    throw new ModesteError(
      `${component[m].name}: Component root must be an HTML element`
    );
  }

  if (!component[m].dom) {
    component[m].dom = createDom(vNode, component, true);
  } else {
    if (component[m].dom[m] && component[m].dom[m].key !== undefined) {
      vNode.props.$key = component[m].dom[m].key;
    }

    updateDom(component[m].dom, vNode, component, true);
  }

  component[m].dom[m].id = component[m].id;

  if (component[m].mounted) emitHook(component, 'didRedraw');
}
