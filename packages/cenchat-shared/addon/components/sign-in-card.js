import { inject as service } from '@ember/service';
import Component from '@ember/component';

import firebase from 'firebase';
import toast from '@cenchat/ui/utils/toast';

import layout from '../templates/components/sign-in-card';

/**
 * @namespace Component
 */
export default Component.extend({
  /**
   * @override
   */
  layout,

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
  tagName: '',

  /**
   * @param {string} type
   * @param {string} [email]
   * @param {string} [displayName]
   * @function
   */
  async handleSignInEvent(type, email, displayName) {
    try {
      if (this.session.isAuthenticated && this.session.data.authenticated.user.isAnonymous) {
        await this.convertAnonymousToPermanentAccount(email, displayName);
      } else {
        await this.signInUser(type, email, displayName);
      }

      await this.preloadSessionRecord();

      if (type === 'email-link' && this.args.redirectUrl) {
        window.location.replace(this.args.redirectUrl);
      } else {
        toast('Signed in successfully');
        this.args.onAfterSignInEvent();
      }
    } catch (error) {
      toast(error.message);
    }
  },

  /**
   * @param {string} email
   * @param {string} displayName
   * @function
   */
  async convertAnonymousToPermanentAccount(email, displayName) {
    const auth = this.firebase.auth();
    const credential = firebase.auth.EmailAuthProvider.credentialWithLink(
      email,
      window.location.href,
    );
    const linkAuthResult = await auth.currentUser.linkAndRetrieveDataWithCredential(credential);

    localStorage.removeItem('cenchatEmailForSignIn');

    await linkAuthResult.user.updateProfile({ displayName });
    await this.updateUserRecord(displayName);
  },

  /**
   * @param {string} displayName
   * @function
   */
  async updateUserRecord(displayName) {
    const db = this.firebase.firestore();
    const currentUserId = this.session.data.authenticated.user.uid;

    await db.doc(`users/${currentUserId}`).update({
      displayName,
      name: displayName.toLowerCase(),
    });
  },

  /**
   * @param {string} type
   * @param {string} [email]
   * @param {string} [displayName]
   * @function
   */
  async signInUser(type, email, displayName) {
    await this.session.authenticate('authenticator:firebase', async (auth) => {
      let credential;

      if (type === 'anonymous') {
        credential = await auth.signInAnonymously();

        await this.store.createRecord('user', { id: credential.user.uid }).save();
      } else if (type === 'email-link') {
        credential = await auth.signInWithEmailLink(email, window.location.href);

        localStorage.removeItem('cenchatEmailForSignIn');

        if (credential.additionalUserInfo.isNewUser) {
          await credential.user.updateProfile({ displayName });
          await this.store.createRecord('user', {
            displayName,
            id: credential.user.uid,
            name: displayName.toLowerCase(),
          }).save();
        }
      }

      return credential;
    });
  },

  /**
   * @function
   */
  async preloadSessionRecord() {
    await this.store.findRecord('user', this.session.data.authenticated.user.uid);
  },
});
