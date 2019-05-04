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
   * @type {string}
   */
  permissionState: null,

  /**
   * @override
   */
  init(...args) {
    this._super(...args);

    this.setupPermissionState();
  },

  /**
   * @override
   */
  async setupPermissionState() {
    if (this.session.isAuthenticated) {
      const isSiteMember = await this.checkIfSiteMember();

      if (
        this.args.chat.get('creator.id') === this.session.data.authenticated.user.uid
        || isSiteMember
      ) {
        this.set('permissionState', 'writer');
      } else {
        this.set('permissionState', 'reader');
      }
    } else {
      this.set('permissionState', 'reader');
    }
  },

  /**
   * @return {Promise.<boolean>} Resolves to true if site member. Otherwise, false.
   * @function
   */
  async checkIfSiteMember() {
    const db = this.firebase.firestore();
    const siteId = this.args.chat.get('site.id');
    const currentUserId = this.session.data.authenticated.user.uid;

    try {
      const docSnapshot = await db.doc(`sites/${siteId}/members/${currentUserId}`).get();

      return docSnapshot.exists;
    } catch (error) {
      return false;
    }
  },

  /**
   * @function
   */
  async handleSendMessageClick(...args) {
    const element = document.querySelector('#site-page-chats-chat_route-view__main-content');

    element.scrollTop = element.scrollHeight;

    await this.onSendMessageEvent(...args);
  },
});
