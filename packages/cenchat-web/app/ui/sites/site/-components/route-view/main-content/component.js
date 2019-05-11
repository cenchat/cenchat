import { inject as service } from '@ember/service';
import Component from '@ember/component';

/**
 * @namespace Component
 */
export default Component.extend({
  /**
   * @type {Ember.Service}
   */
  session: service('session'),

  /**
   * @override
   */
  tagName: '',

  /**
   * @type {boolean}
   */
  isAdmin: false,

  /**
   * @override
   */
  init(...args) {
    this._super(...args);

    this.setupIsAdmin();
  },

  /**
   * @function
   */
  async setupIsAdmin() {
    const { uid: currentUserId } = this.session.data.authenticated.user;

    this.set('isAdmin', await this.args.site.isAdmin(currentUserId));
  },
});
