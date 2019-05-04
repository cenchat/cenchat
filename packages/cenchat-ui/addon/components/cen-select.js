import Component from '@ember/component';

import layout from '../templates/components/cen-select';

/**
 * @namespace Component
 */
export default Component.extend({
  /**
   * @override
   */
  layout,

  /**
   * @override
   */
  tagName: 'label',

  /**
   * @override
   */
  classNames: ['cen-select'],

  /**
   * @param {string} value
   * @function
   */
  handleChange(value) {
    if (this.onChange) {
      this.onChange(value);
    }
  },
});
