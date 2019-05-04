import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import Controller from '@ember/controller';

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
   * @type {Object}
   */
  pendingProfileChange: { displayUsername: null },

  /**
   * @type {boolean}
   */
  hasPendingProfileChanges: computed('pendingProfileChange', {
    get() {
      return (
        this.pendingProfileChange.displayUsername !== null
        && this.pendingProfileChange.displayUsername.trim()
      );
    },
  }),

  /**
   * @param {Object} data
   * @function
   */
  handleProfileUpdateEvent(data) {
    this.set('pendingProfileChange', { ...this.pendingProfileChange, ...data });
  },

  /**
   * @function
   */
  async handleProfileFormSubmit() {
    const { displayUsername: newDisplayUsername } = this.pendingProfileChange;
    const newUsername = newDisplayUsername.toLowerCase();
    const currentUsername = this.model.get('username');

    this.model.set('displayUsername', newDisplayUsername);
    this.model.set('username', newUsername);

    try {
      await this.model.save({
        adapterOptions: {
          include: (batch, db) => {
            batch.delete(db.doc(`usernames/${currentUsername}`));
            batch.set(db.doc(`usernames/${newUsername}`), {
              cloudFirestoreReference: db.doc(`users/${this.model.get('id')}`),
            });
          },
        },
      });
      await this.session.data.authenticated.user.updateProfile({ displayName: newDisplayUsername });
      this.set('pendingProfileChange', { displayUsername: null });
      this.transitionToRoute('my-account');
      toast('Profile updated');
    } catch (error) {
      if (error.code === 'permission-denied') {
        toast('Username already exists');
      } else {
        toast(error.message);
      }
    }
  },
});
