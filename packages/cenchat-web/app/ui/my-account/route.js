import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';

/**
 * @namespace Route
 */
export default class MyAccountRoute extends Route {
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
  model() {
    const { uid } = this.session.data.authenticated.user;

    return this.store.findRecord('user', uid);
  }
}
