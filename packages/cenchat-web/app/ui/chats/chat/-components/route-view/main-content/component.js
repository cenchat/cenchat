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
   * @type {number}
   */
  currentLimit: null,

  /**
   * @override
   */
  init(...args) {
    this._super(...args);

    this.set('currentLimit', this.args.chat.get('hasManyLimit.descendingMessages'));
  },

  /**
   * @function
   */
  async handleLoadMoreContentEvent() {
    const currentLimit = this.args.chat.get('hasManyLimit.descendingMessages');

    this.set('currentLimit', currentLimit + 8);
    this.args.chat.set('hasManyLimit', {
      ...this.args.chat.get('hasManyLimit'),
      [this.field]: currentLimit + 8,
    });

    await this.args.chat.get(this.field).reload();
  },
});
