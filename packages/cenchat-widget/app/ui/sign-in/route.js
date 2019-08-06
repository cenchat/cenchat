import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';

/**
 * @namespace Route
 */
export default class SignInRoute extends Route {
  /**
   * @type {Ember.Service}
   */
  @service('session')
  session;

  /**
   * @override
   */
  beforeModel() {
    if (this.session.isAuthenticated && !this.session.data.authenticated.user.isAnonymous) {
      window.location.replace('https://cenchat.com');
    }
  }
}
