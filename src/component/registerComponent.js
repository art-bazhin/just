import { INTERNAL_VAR_NAME as m } from '../constants';
import Component from './Component';
import generateScope from './generateScope';
import generateId from '../utils/generateId';
import addStyles from '../dom/addStyles';

export default function registerComponent(parent, name, manifest) {
  if (!parent[m].factories[name]) {
    let scope = generateScope(name);

    addStyles(manifest.style(), scope);

    parent[m].factories[name] = (props, parent) => {
      let id = generateId(1000000, parent[m].children);

      let component = new Component(
        {
          name,
          manifest,
          scope,
          id,
          props
        },
        parent[m].app
      );

      parent[m].children[id] = component;

      return component;
    };
  }
}