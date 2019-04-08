import { getOwner } from '@ember/application';
import { inject as service } from '@ember/service';
import Component from '@ember/component';

import toast from '@cenchat/ui/utils/toast';

import layout from '../templates/components/sign-in-card-view-email';

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
   * @type {Ember.Service}
   */
  session: service('session'),

  /**
   * @override
   */
  tagName: '',

  /**
   * @type {string}
   */
  email: null,

  /**
   * @function
   */
  async handleEmailLinkFormSubmit() {
    let { emailLinkSignInUrl } = getOwner(this).resolveRegistration('config:environment');

    if (this.args.redirectUrl) {
      emailLinkSignInUrl += `?redirect_url=${this.args.redirectUrl}`;
    }

    await this.firebase.auth().sendSignInLinkToEmail(this.email, {
      url: emailLinkSignInUrl,
      handleCodeInApp: true,
    });
    localStorage.setItem('cenchatEmailForSignIn', this.email);
    toast('Link sent');
  },
});
