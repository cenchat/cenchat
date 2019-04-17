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
  store: service('store'),

  /**
   * @type {Object}
   */
  info: { displayName: null },

  /**
   * @type {boolean}
   */
  isInfoDirty: computed('info', {
    get() {
      return this.info.displayName !== null && this.info.displayName.trim();
    },
  }),

  /**
   * @param {Object} newInfo
   * @function
   */
  handleInfoUpdateEvent(newInfo) {
    this.set('info', { ...this.info, ...newInfo });
  },

  /**
   * @function
   */
  async handleInfoFormSubmit() {
    this.model.set('displayName', this.info.displayName.trim());
    this.model.set('name', this.info.displayName.trim().toLowerCase());
    await this.model.save();
    this.set('info', { displayName: null });
    toast('Info updated');
  },
});
