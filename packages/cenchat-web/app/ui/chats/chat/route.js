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
  model(params) {
    return this.store.findRecord('chat', params.chat_id);
  },

  /**
   * @override
   */
  async afterModel(model) {
    const isUnread = await model.get('isUnread');

    if (isUnread) {
      const db = this.firebase.firestore();
      const { uid } = this.session.data.authenticated.user;

      await db
        .collection('users')
        .doc(uid)
        .collection('unreadChats')
        .doc(model.get('id'))
        .delete();
    }

    // Preload site and page
    await Promise.all([model.get('site'), model.get('page')]);
  },
});
