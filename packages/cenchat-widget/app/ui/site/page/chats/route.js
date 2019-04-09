import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';

/**
 * @namespace Route
 */
export default Route.extend({
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
    const page = this.modelFor('site.page');
    const [publicChats, currentUserChat] = await Promise.all([
      page.get('publicChats'),
      this.fetchCurrentUserChat(),
    ]);

    return { publicChats, currentUserChat };
  },

  /**
   * @return {Promise} Resolves to the current user's chat
   * @function
   */
  async fetchCurrentUserChat() {
    if (this.session.isAuthenticated) {
      const page = this.modelFor('site.page');
      const { uid: currentUserId } = this.session.data.authenticated.user;

      try {
        const chat = await this.store.findRecord('chat', `${page.get('id')}__${currentUserId}`);

        return chat;
      } catch (error) {
        return null;
      }
    }

    return null;
  },
});
