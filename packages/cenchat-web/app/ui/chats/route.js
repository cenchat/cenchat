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
    const { uid } = this.session.data.authenticated.user;
    const user = await this.store.findRecord('user', uid);

    return user.get('latestActiveChats');
  },
});
