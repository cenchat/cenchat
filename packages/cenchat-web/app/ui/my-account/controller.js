import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import Controller from '@ember/controller';

import toast from '@cenchat/ui/utils/toast';

/**
 * @namespace Controller
 */
export default class MyAccountController extends Controller {
  /**
   * @type {Ember.Service}
   */
  @service('session')
  session;

  /**
   * @function
   */
  @action
  async handleSignOutClick() {
    await this.session.invalidate();
    this.transitionToRoute('sign-in');
    toast('Signed out successfully');
  }
}
