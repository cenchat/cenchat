import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';

/**
 * @namespace Route
 */
export default class SitesRoute extends Route {
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
  async model() {
    const { uid } = this.session.data.authenticated.user;
    const user = await this.store.findRecord('user', uid);
    const [sitesAsAdmin, sitesAsModerator] = await Promise.all([
      user.get('sitesAsAdmin'),
      user.get('sitesAsModerator'),
    ]);

    return { sitesAsAdmin, sitesAsModerator };
  }
}
