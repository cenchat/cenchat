import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';

/**
 * @namespace Route
 */
export default Route.extend({
  /**
   * @type {Ember.Service}
   */
  firebase: service('firebase'),

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
  actions: {
    /**
     * @override
     */
    loading(transition) {
      let scrimElement = document.querySelector('.scrim');

      if (!scrimElement) {
        const progressBarElement = document.createElement('div');

        progressBarElement.classList.add('scrim__progress-bar');

        scrimElement = document.createElement('div');

        scrimElement.classList.add('scrim');

        scrimElement.appendChild(progressBarElement);
        document.body.appendChild(scrimElement);
      }

      transition.promise.finally(() => scrimElement.remove());
    },
  },

  /**
   * @override
   */
  beforeModel() {
    if (!this.session.isAuthenticated) {
      this.transitionTo('sign-in');
    }
  },

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
  },

  /**
   * @override
   */
  redirect(model, transition) {
    if (this.session.isAuthenticated && transition.targetName === 'index') {
      this.transitionTo('chats');
    }
  },

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
