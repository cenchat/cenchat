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
  router: service('router'),

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
  newSiteData: null,

  /**
   * @type {boolean}
   */
  hasPendingSiteChanges: false,

  /**
   * @param {Object} data
   * @function
   */
  handleSiteUpdateEvent(data) {
    if (!this.newSiteData) {
      this.set('newSiteData', {
        brandColor: this.model.get('brandColor'),
        displayName: this.model.get('displayName'),
        name: this.model.get('name'),
        theme: this.model.get('theme'),
      });
    }

    this.set('newSiteData', { ...this.newSiteData, ...data });
    this.set('hasPendingSiteChanges', true);
  },

  /**
   * @function
   */
  async handleSiteFormSubmit() {
    this.model.setProperties({
      ...this.newSiteData,
      name: this.newSiteData.displayName.toLowerCase(),
    });

    try {
      await this.model.save();
      this.set('hasPendingSiteChanges', false);
      this.transitionToRoute('sites.site');
      toast('Site updated');
    } catch (error) {
      toast(error.message);
    }
  },
});
