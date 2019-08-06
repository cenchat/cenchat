import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import Component from '@ember/component';

import toast from '@cenchat/ui/utils/toast';

/**
 * @namespace Component
 */
export default class MainContentComponent extends Component {
  /**
   * @type {Ember.Service}
   */
  @service('router')
  router;

  /**
   * @type {Ember.Service}
   */
  @service('session')
  session;

  /**
   * @override
   */
  tagName = '';

  /**
   * @function
   */
  @action
  async handleSignOutClick() {
    await this.session.invalidate();
    toast('Signed out successfully');
    this.router.transitionTo('site.page.chats');
  }
}
