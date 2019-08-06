import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import Controller from '@ember/controller';

import firebase from 'firebase';

/**
 * @namespace Controller
 */
export default class NewController extends Controller {
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
   * @param {string} text
   * @function
   */
  @action
  async handleSendMessageClick(text) {
    if (!this.session.isAuthenticated) {
      await this.signInAnonymously();
    }

    const currentUser = this.store.peekRecord('user', this.session.data.authenticated.user.uid);
    const chatId = await this.saveChatAndMessage(currentUser, text);

    this.transitionToRoute('site.page.chats.chat', chatId);
  }

  /**
   * @function
   */
  async signInAnonymously() {
    await this.session.authenticate('authenticator:firebase', async (auth) => {
      const credential = await auth.signInAnonymously();

      await this.store.createRecord('user', { id: credential.user.uid }).save();

      return credential;
    });
  }

  /**
   * @param {Model.User} currentUser
   * @param {string} [text=null]
   * @return {Promise.<string>} Resolves to the created chat ID
   * @function
   */
  async saveChatAndMessage(currentUser, text = null) {
    const chat = this.store.createRecord('chat', {
      ...this.model,
      id: `${this.model.page.get('id')}__${currentUser.get('id')}`,
      creator: currentUser,
    });

    await chat.save({
      adapterOptions: {
        include(batch, db) {
          const timestamp = firebase.firestore.FieldValue.serverTimestamp();
          const messageDocRef = db.collection('messages').doc();

          batch.set(db.doc(`chats/${chat.get('id')}`), {
            lastActivityTimestamp: timestamp,
            lastMessage: messageDocRef,
          }, { merge: true });
          batch.set(messageDocRef, {
            text,
            author: db.doc(`users/${currentUser.get('id')}`),
            chat: db.doc(`chats/${chat.get('id')}`),
            createdOn: timestamp,
            media: null,
          });
        },
      },
    });

    return chat.get('id');
  }
}
