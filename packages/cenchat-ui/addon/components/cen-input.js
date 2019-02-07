import { scheduleOnce } from '@ember/runloop';
import Component from '@ember/component';

import layout from '../templates/components/cen-input';

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
  classNames: ['cen-input'],

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
    this.processInput(value);
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
    const element = this.element.querySelector('input');

    if (!element.checkValidity()) {
      return element.validity.patternMismatch
        ? element.getAttribute('title')
        : element.validationMessage;
    }

    return null;
  },
});
