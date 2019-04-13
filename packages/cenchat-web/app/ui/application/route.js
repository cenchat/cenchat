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
  beforeModel() {
    if (!this.session.isAuthenticated) {
      this.transitionTo('sign-in');
    }
  },

  /**
   * @override
   */
  async afterModel() {
    if (this.session.isAuthenticated) {
      // Preload user model
      await this.store.findRecord('user', this.session.data.authenticated.user.uid);
    }
  },

  /**
   * @override
   */
  redirect() {
    if (this.session.isAuthenticated) {
      this.transitionTo('chats');
    }
  },
});
