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
  beforeModel() {
    if (this.session.isAuthenticated && !this.session.data.authenticated.user.isAnonymous) {
      window.location.replace('https://cenchat.com');
    }
  },
});
