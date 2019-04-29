import Component from '@ember/component';

/**
 * @namespace
 */
export default Component.extend({
  /**
   * @override
   */
  tagName: '',

  /**
   * @param {string} value
   * @function
   */
  handleDisplayUsernameInput(value) {
    this.args.onProfileUpdateEvent({ displayUsername: value });
  },
});
