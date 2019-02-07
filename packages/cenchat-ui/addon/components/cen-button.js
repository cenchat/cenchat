import Component from '@ember/component';

import layout from '../templates/components/cen-button';

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
   * @type {boolean}
   */
  isPerforming: false,

  /**
   * @function
   */
  async handleClick(...args) {
    this.set('isPerforming', true);

    if (this.onClick) {
      await this.onClick(...args);
    }

    this.set('isPerforming', false);
  },
});
