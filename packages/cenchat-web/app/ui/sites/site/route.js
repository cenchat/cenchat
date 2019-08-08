import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';

/**
 * @namespace Route
 */
export default class SiteRoute extends Route {
  /**
   * @type {Ember.Service}
   */
  @service('session')
  session;

  /**
   * @type {Ember.Service}
   */
  @service('store')
  store;

  /**
   * @override
   */
  model(params) {
    return this.store.findRecord('site', params.site_id);
  }

  /**
   * @override
   */
  async afterModel(model) {
    const { uid: currentUserId } = this.session.data.authenticated.user;
    const isMember = await model.isMember(currentUserId);

    if (!isMember) {
      this.transitionTo('sites');
    }
  }
}
