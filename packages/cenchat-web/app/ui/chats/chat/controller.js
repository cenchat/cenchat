import { inject as service } from '@ember/service';
import Controller from '@ember/controller';

import firebase from 'firebase';
import toast from '@cenchat/ui/utils/toast';

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

  /**
   * @param {boolean} value
   * @function
   */
  async handleToggleChatVisibilityClick(value) {
    this.model.set('isPublic', value);
    await this.model.save();

    if (value) {
      toast('Chat is now visible to everyone');
    } else {
      toast('Chat is now visible only to the creator and the site members');
    }
  },
});
