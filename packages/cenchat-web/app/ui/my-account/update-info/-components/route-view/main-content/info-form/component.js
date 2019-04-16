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
  handleDisplayNameInput(value) {
    this.args.onInfoUpdateEvent({ displayName: value });
  },
});
