import Component from '@ember/component';

import layout from '../templates/components/cen-form';

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
  tagName: '',

  /**
   * @param {Event} event
   * @function
   */
  handleSubmit(event, ...args) {
    event.preventDefault();

    if (this.onSubmit) {
      this.onSubmit(event, ...args);
    }
  },
});
