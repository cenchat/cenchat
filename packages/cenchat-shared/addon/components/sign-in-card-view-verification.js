import { inject as service } from '@ember/service';
import Component from '@ember/component';

import layout from '../templates/components/sign-in-card-view-verification';

/**
 * @namespace Component
 */
export default Component.extend({
  /**
   * @override
   */
  layout,

  /**
   * @type {Ember.Service}
   */
  firebase: service('firebase'),

  /**
   * @override
   */
  init(...args) {
    this._super(...args);

    this.set('email', localStorage.getItem('cenchatEmailForSignIn'));
  },

  /**
   * @function
   */
  async handleVerificationFormSubmit() {
    const auth = this.firebase.auth();
    const providers = await auth.fetchSignInMethodsForEmail(this.email);

    if (providers.length === 0) {
      this.set('isEmailNotExisting', true);
    } else {
      this.args.onSignInEvent('email-link', this.email);
    }
  },
});
