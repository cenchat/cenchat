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
  pendingProfileChange: { displayName: null },

  /**
   * @type {boolean}
   */
  hasPendingProfileChanges: computed('pendingProfileChange', {
    get() {
      return (
        this.pendingProfileChange.displayName !== null
        && this.pendingProfileChange.displayName.trim()
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
    const { displayName } = this.pendingProfileChange;

    this.model.set('displayName', displayName.trim());
    this.model.set('name', displayName.trim().toLowerCase());
    await this.model.save();
    await this.session.data.authenticated.user.updateProfile({ displayName });
    this.set('pendingProfileChange', { displayName: null });
    toast('Profile updated');
  },
});
