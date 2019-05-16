import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';

/**
 * @namespace Route
 */
export default Route.extend({
  /**
   * @type {Ember.Service}
   */
  firebase: service('firebase'),

  /**
   * @type {Ember.Service}
   */
  session: service('session'),

  /**
   * @type {Ember.Service}
   */
  store: service('store'),

  /**
   * @override
   */
  async model() {
    const { uid } = this.session.data.authenticated.user;
    const user = await this.store.findRecord('user', uid);

    return user.get('latestActiveChats');
  },

  /**
   * @override
   */
  async afterModel(model) {
    const db = this.firebase.firestore();
    const { uid } = this.session.data.authenticated.user;
    const promises = model.map(async (chat) => {
      const unreadChatDocSnapshot = await db
        .collection('users')
        .doc(uid)
        .collection('unreadChats')
        .doc(chat.get('id'))
        .get();

      chat.set('isUnread', unreadChatDocSnapshot.exists);
    });

    return Promise.all(promises);
  },
});
