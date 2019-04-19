import Component from '@ember/component';

/**
 * @namespace Component
 */
export default Component.extend({
  /**
   * @override
   */
  tagName: '',

  /**
   * @type {string}
   */
  confirmationKey: null,

  /**
   * @type {string}
   */
  repeatConfirmationKey: null,

  /**
   * @override
   */
  init(...args) {
    this._super(...args);

    this.set('confirmationKey', Math.random().toString(32).slice(2).substr(0, 5));
  },

  /**
   * @function
   */
  handleConfirmDeleteAccountClick() {
    this.set('isConfirmDeleteAccountVisible', true);
  },

  /**
   * @param {string} value
   * @function
   */
  handleConfirmationKeyInput(value) {
    this.set('repeatConfirmationKey', value);
  },
});
