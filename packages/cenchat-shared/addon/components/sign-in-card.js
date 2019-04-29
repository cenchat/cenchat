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
   * @param {string} [displayUsername]
   * @function
   */
  async handleSignInEvent(type, email, displayUsername) {
    try {
      if (this.session.isAuthenticated && this.session.data.authenticated.user.isAnonymous) {
        await this.convertAnonymousToPermanentAccount(email, displayUsername);
      } else {
        await this.signInUser(type, email, displayUsername);
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
   * @param {string} displayUsername
   * @function
   */
  async convertAnonymousToPermanentAccount(email, displayUsername) {
    const auth = this.firebase.auth();
    const credential = firebase.auth.EmailAuthProvider.credentialWithLink(
      email,
      window.location.href,
    );
    const linkAuthResult = await auth.currentUser.linkAndRetrieveDataWithCredential(credential);

    localStorage.removeItem('cenchatEmailForSignIn');

    await linkAuthResult.user.updateProfile({ displayName: displayUsername });
    await this.updateUserRecord(displayUsername);
  },

  /**
   * @param {string} displayUsername
   * @function
   */
  async updateUserRecord(displayUsername) {
    const db = this.firebase.firestore();
    const batch = db.batch();
    const currentUserId = this.session.data.authenticated.user.uid;

    batch.update(db.doc(`users/${currentUserId}`), {
      displayUsername,
      username: displayUsername.toLowerCase(),
    });
    batch.set(db.doc(`usernames/${displayUsername}`), {
      cloudFirestoreReference: db.doc(`users/${currentUserId}`),
    });

    await batch.commit();
  },

  /**
   * @param {string} type
   * @param {string} [email]
   * @param {string} [displayUsername]
   * @function
   */
  async signInUser(type, email, displayUsername) {
    await this.session.authenticate('authenticator:firebase', async (auth) => {
      let credential;

      if (type === 'anonymous') {
        credential = await auth.signInAnonymously();

        await this.store.createRecord('user', { id: credential.user.uid }).save();
      } else if (type === 'email-link') {
        credential = await auth.signInWithEmailLink(email, window.location.href);

        localStorage.removeItem('cenchatEmailForSignIn');

        if (credential.additionalUserInfo.isNewUser) {
          await credential.user.updateProfile({ displayName: displayUsername });

          const username = displayUsername.toLowerCase();

          await this.store.createRecord('user', {
            displayUsername,
            username,
            id: credential.user.uid,
          }).save({
            adapterOptions: {
              include(batch, db) {
                batch.set(db.doc(`usernames/${username}`), {
                  cloudFirestoreReference: db.doc(`users/${credential.user.uid}`),
                });
              },
            },
          });
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
