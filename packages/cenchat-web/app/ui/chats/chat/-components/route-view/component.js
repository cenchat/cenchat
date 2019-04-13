import { inject as service } from '@ember/service';
import Component from '@ember/component';

/**
 * @namespace Component
 */
export default Component.extend({
  /**
   * @type {Ember.Service}
   */
  firebase: service('firebase'),

  /**
   * @type {Ember.Service}
   */
  session: service('session'),

  /**
   * @override
   */
  tagName: '',

  async handleSendMessageClick(...args) {
    const element = document.querySelector('#chats-chat_route-view__main-content');

    element.scrollTop = element.scrollHeight;

    await this.onSendMessageEvent(...args);
  },
});
