import { computed } from '@ember/object';
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
   * @type {string}
   */
  field: computed('args', {
    get() {
      if (this.args.permissionState === 'writer') {
        return 'descendingMessages';
      }

      if (this.args.permissionState === 'reader') {
        return 'messages';
      }

      return null;
    },
  }),

  /**
   * @override
   */
  init(...args) {
    this._super(...args);

    this.set('currentLimit', this.args.chat.get(`hasManyLimit.${this.field}`));
  },

  /**
   * @function
   */
  async handleLoadMoreContentEvent() {
    const currentLimit = this.args.chat.get(`hasManyLimit.${this.field}`);

    this.set('currentLimit', currentLimit + 8);
    this.args.chat.set('hasManyLimit', {
      ...this.args.chat.get('hasManyLimit'),
      [this.field]: currentLimit + 8,
    });

    await this.args.chat.get(this.field).reload();
  },
});
