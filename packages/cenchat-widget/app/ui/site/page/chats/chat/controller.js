import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import Controller from '@ember/controller';

import firebase from 'firebase';

/**
 * @namespace Controller
 */
export default class ChatController extends Controller {
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
  async handleSendMessageEvent(text) {
    const currentUser = this.store.peekRecord('user', this.session.data.authenticated.user.uid);
    const chat = this.model;
    const message = this.store.createRecord('message', {
      chat,
      text,
      author: currentUser,
    });

    await message.save({
      adapterOptions: {
        include(batch, db) {
          batch.set(db.doc(`chats/${chat.get('id')}`), {
            lastActivityTimestamp: firebase.firestore.FieldValue.serverTimestamp(),
            lastMessage: db.doc(`messages/${message.get('id')}`),
          }, { merge: true });
        },
      },
    });
  }
}
