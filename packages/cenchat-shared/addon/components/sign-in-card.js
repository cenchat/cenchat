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
   * @param {string} [fullName]
   * @function
   */
  async handleSignInEvent(type, email, fullName) {
    try {
      if (this.session.isAuthenticated && this.session.data.authenticated.user.isAnonymous) {
        await this.convertAnonymousToPermanentAccount(email, fullName);
      } else {
        await this.signInUser(type, email, fullName);
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
   * @param {string} fullName
   * @function
   */
  async convertAnonymousToPermanentAccount(email, fullName) {
    const auth = this.firebase.auth();
    const credential = firebase.auth.EmailAuthProvider.credentialWithLink(
      email,
      window.location.href,
    );
    const linkAuthResult = await auth.currentUser.linkAndRetrieveDataWithCredential(credential);

    localStorage.removeItem('cenchatEmailForSignIn');

    await linkAuthResult.user.updateProfile({ displayName: fullName });
    await this.updateUserRecord(fullName);
  },

  /**
   * @param {string} fullName
   * @function
   */
  async updateUserRecord(fullName) {
    const db = this.firebase.firestore();
    const currentUserId = this.session.data.authenticated.user.uid;

    await db.doc(`users/${currentUserId}`).update({
      displayName: fullName,
      name: fullName.toLowerCase(),
    });
  },

  /**
   * @param {string} type
   * @param {string} [email]
   * @param {string} [fullName]
   * @function
   */
  async signInUser(type, email, fullName) {
    await this.session.authenticate('authenticator:firebase', async (auth) => {
      let credential;

      if (type === 'anonymous') {
        credential = await auth.signInAnonymously();

        await this.store.createRecord('user', { id: credential.user.uid }).save();
      } else if (type === 'email-link') {
        credential = await auth.signInWithEmailLink(email, window.location.href);

        localStorage.removeItem('cenchatEmailForSignIn');

        if (credential.additionalUserInfo.isNewUser) {
          await credential.user.updateProfile({ displayName: fullName });
          await this.store.createRecord('user', {
            id: credential.user.uid,
            displayName: fullName,
            name: fullName.toLowerCase(),
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
