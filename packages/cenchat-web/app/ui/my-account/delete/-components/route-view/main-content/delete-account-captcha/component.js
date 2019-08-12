import { action } from '@ember/object';
import Component from '@ember/component';

/**
 * @namespace Component
 */
export default class DeleteAccountCaptchaComponent extends Component {
  /**
   * @override
   */
  tagName = '';

  /**
   * @type {string}
   */
  confirmationKey = null;

  /**
   * @type {string}
   */
  repeatConfirmationKey = null;

  /**
   * @override
   */
  init(...args) {
    super.init(...args);

    this.set('confirmationKey', Math.random().toString(32).slice(2).substr(0, 5));
  }

  /**
   * @function
   */
  @action
  handleConfirmDeleteAccountClick() {
    this.set('isConfirmDeleteAccountVisible', true);
  }

  /**
   * @param {string} value
   * @function
   */
  @action
  handleConfirmationKeyInput(value) {
    this.set('repeatConfirmationKey', value);
  }
}
