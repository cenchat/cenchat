import { action } from '@ember/object';
import Controller from '@ember/controller';

import toast from '@cenchat/ui/utils/toast';

/**
 * @namespace Controller
 */
export default class UpdateController extends Controller {
  /**
   * @type {Object}
   */
  newSiteData = null;

  /**
   * @type {boolean}
   */
  hasPendingSiteChanges = false;

  /**
   * @param {Object} data
   * @function
   */
  @action
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
  }

  /**
   * @function
   */
  @action
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
  }
}
