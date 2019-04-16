import { inject as service } from '@ember/service';
import Controller from '@ember/controller';

import firebase from 'firebase';

/**
 * @namespace Controller
 */
export default Controller.extend({
  /**
   * @type {Ember.Service}
   */
  session: service('session'),

  /**
   * @type {Ember.Service}
   */
  store: service('store'),

  /**
   * @param {string} text
   * @function
   */
  async handleSendMessageEvent(text) {
    const currentUser = await this.store.findRecord(
      'user',
      this.session.data.authenticated.user.uid,
    );
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
  },
});
