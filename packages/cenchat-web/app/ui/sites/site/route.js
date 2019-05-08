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
  model(params) {
    return this.store.findRecord('site', params.site_id);
  },

  /**
   * @override
   */
  async afterModel(model) {
    const { uid: currentUserId } = this.session.data.authenticated.user;
    const isMember = await model.isMember(currentUserId);

    if (!isMember) {
      this.transitionTo('sites');
    }
  },
});
