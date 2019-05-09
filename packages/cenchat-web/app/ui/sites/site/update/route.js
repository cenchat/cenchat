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
   * @override
   */
  async beforeModel() {
    const site = this.modelFor('sites.site');
    const { uid: currentUserId } = this.session.data.authenticated.user;
    const isAdmin = await site.isAdmin(currentUserId);

    if (!isAdmin) {
      this.transitionTo('sites.site');
    }
  },

  /**
   * @override
   */
  model() {
    return this.modelFor('sites.site');
  },
});
