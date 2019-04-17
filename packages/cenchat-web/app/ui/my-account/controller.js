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
   * @function
   */
  async handleSignOutClick() {
    await this.session.invalidate();
    this.transitionToRoute('sign-in');
    toast('Signed out successfully');
  },
});
