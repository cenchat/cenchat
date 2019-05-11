import { debounce, scheduleOnce } from '@ember/runloop';
import Component from '@ember/component';

import layout from '../templates/components/cen-textarea';

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
  classNames: ['cen-textarea'],

  /**
   * @type {string}
   */
  feedback: null,

  /**
   * @type {boolean}
   */
  isInvalid: false,

  /**
   * @param {string} value
   * @function
   */
  handleInput(value) {
    debounce(this, 'processInput', value, 1000);
  },

  /**
   * @param {string} value
   * @function
   */
  processInput(value) {
    // Set isInvalid to false to destroy the feedback element
    // before setting a new one so that screen readers will only
    // read out the latest feedback
    this.set('isInvalid', false);

    scheduleOnce('afterRender', () => {
      const feedback = this.getValidationFeedback();

      this.set('isInvalid', !!feedback);
      this.set('feedback', feedback);

      if (this.onInput) {
        if (feedback) {
          this.onInput(null);
        } else {
          this.onInput(value);
        }
      }
    });
  },

  /**
   * @return {string|null} Feedback
   * @function
   */
  getValidationFeedback() {
    const element = this.element.querySelector('textarea');

    if (!element.checkValidity()) {
      return element.validationMessage;
    }

    return null;
  },
});
