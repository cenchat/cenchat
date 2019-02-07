import { inject as service } from '@ember/service';
import Component from '@ember/component';

import toast from '@cenchat/ui/utils/toast';

/**
 * @namespace Component
 */
export default Component.extend({
  /**
   * @type {Ember.Service}
   */
  router: service('router'),

  /**
   * @type {Ember.Service}
   */
  session: service('session'),

  /**
   * @override
   */
  tagName: '',

  /**
   * @function
   */
  async handleSignOutClick() {
    await this.session.invalidate();
    toast('Signed out successfully');
    this.router.transitionTo('site.page.chats');
  },
});
