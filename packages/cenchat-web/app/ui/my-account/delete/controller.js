import { action } from '@ember/object';
import { getOwner } from '@ember/application';
import { inject as service } from '@ember/service';
import Controller from '@ember/controller';

import fetch from 'fetch';

/**
 * @namespace Controller
 */
export default class DeleteController extends Controller {
  /**
   * @type {Ember.Service}
   */
  @service('session')
  session;

  /**
   * @function
   */
  @action
  async handleDeleteAccountFormSubmit() {
    const config = getOwner(this).resolveRegistration('config:environment');
    const token = await this.session.data.authenticated.user.getIdToken();

    await fetch(`${config.apiHost}/users/${this.session.data.authenticated.user.uid}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    await this.session.invalidate();

    if (config.environment !== 'test') {
      window.location.replace('https://cenchat.com');
    }
  }
}
