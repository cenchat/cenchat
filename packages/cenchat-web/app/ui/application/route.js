import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';

/**
 * @namespace Route
 */
export default class ApplicationRoute extends Route {
  /**
   * @type {Ember.Service}
   */
  @service('firebase')
  firebase;

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
  beforeModel() {
    if (!this.session.isAuthenticated) {
      this.transitionTo('sign-in');
    }
  }

  /**
   * @override
   */
  async afterModel() {
    if (this.session.isAuthenticated) {
      // Preload user model
      await this.store.findRecord('user', this.session.data.authenticated.user.uid);
      this.setupPushNotification();
    }

    this.hideSplashScreen();
  }

  /**
   * @override
   */
  redirect(model, transition) {
    if (this.session.isAuthenticated && transition.targetName === 'index') {
      this.transitionTo('chats');
    }
  }

  /**
   * @override
   */
  @action
  loading(transition) {
    let controller;

    try {
      controller = this.controllerFor('application');

      controller.set('isScrimVisible', true);
      transition.promise.finally(() => controller.set('isScrimVisible', false));
    } catch (error) {
      // Do nothing
    }
  }

  /**
   * @function
   */
  async setupPushNotification() {
    if ('serviceWorker' in navigator) {
      try {
        const messaging = this.firebase.messaging();

        await messaging.requestPermission();

        const db = this.firebase.firestore();
        const { uid } = this.session.data.authenticated.user;
        const tokensCollectionRef = db.collection(`users/${uid}/notificationTokens`);

        messaging.onTokenRefresh(async () => {
          const token = await messaging.getToken();

          await tokensCollectionRef.doc(token).set({});
        });

        const token = await messaging.getToken();

        await tokensCollectionRef.doc(token).set({});
      } catch (error) {
        // Do nothing
      }
    }
  }

  /**
   * @function
   */
  hideSplashScreen() {
    const splashScreenElement = document.querySelector('.splash-screen');

    if (splashScreenElement) {
      splashScreenElement.classList.add('splash-screen--loaded');
    }
  }
}
