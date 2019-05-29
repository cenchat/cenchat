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
  async afterModel() {
    if (this.session.isAuthenticated) {
      // Preload user model
      await this.store.findRecord('user', this.session.data.authenticated.user.uid);
    }

    this.hideSplashScreen();
  },

  /**
   * @function
   */
  hideSplashScreen() {
    const splashScreenElement = document.querySelector('.splash-screen');

    if (splashScreenElement) {
      splashScreenElement.classList.add('splash-screen--loaded');
    }
  },
});
