import { inject as service } from '@ember/service';
import Component from '@ember/component';

/**
 * @namespace Component
 */
export default class MainContentComponent extends Component {
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
   * @type {boolean}
   */
  isAdmin = false;

  /**
   * @override
   */
  init(...args) {
    super.init(...args);

    this.setupIsAdmin();
  }

  /**
   * @function
   */
  async setupIsAdmin() {
    const { uid: currentUserId } = this.session.data.authenticated.user;

    this.set('isAdmin', await this.args.site.isAdmin(currentUserId));
  }
}
