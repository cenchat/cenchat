import { computed } from '@ember/object';
import Component from '@ember/component';
import layout from '../templates/components/chat-composer';

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
   * @type {string}
   */
  text: null,

  /**
   * @type {string}
   */
  cleanText: computed('text', {
    get() {
      return this.text.trim();
    },
  }),

  /**
   * @function
   */
  async handleSendMessageClick() {
    await this.args.onSendMessageClick(this.cleanText);
    this.set('text', null);
  },
});
