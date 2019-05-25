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
    this.markChatAsRead();
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

  /**
   * @function
   */
  async handleScrollToBottom() {
    await this.markChatAsRead();
  },

  /**
   * @function
   */
  async markChatAsRead() {
    const isUnread = await this.args.chat.get('isUnread');

    if (isUnread) {
      const db = this.firebase.firestore();
      const { uid } = this.session.data.authenticated.user;

      await db
        .collection('users')
        .doc(uid)
        .collection('unreadChats')
        .doc(this.args.chat.get('id'))
        .delete();

      const randomString = Math.random().toString(32).slice(2).substr(0, 5);

      this.args.chat.set('cacheBusterForIsUnread', randomString);
    }
  },
});
