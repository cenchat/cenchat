/* eslint ember/no-attrs-in-components: off */
/* eslint ember/no-attrs-snapshot: off */

import Component from '@ember/component';

/**
 * Implements a this.args property in Components
 */
export function initialize() {
  Component.reopen({
    init(...args) {
      this._super(...args);

      this._setupComponentArgs();
    },

    didUpdateAttrs(...args) {
      this._super(...args);

      this._setupComponentArgs();
    },

    _setupComponentArgs() {
      const componentArgs = {};

      Object.keys(this.attrs).forEach((key) => {
        componentArgs[key] = this.get(key);
      });

      this.set('args', Object.freeze(componentArgs));
    },
  });
}

export default {
  initialize,
};
