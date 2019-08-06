import { action } from '@ember/object';
import Controller from '@ember/controller';

/**
 * @namespace Controller
 */
export default class SignInController extends Controller {
  /**
   * @type {string}
   */
  get redirectUrl() {
    const page = this.model;
    const redirectUrl = `http://${page.get('site.hostname')}${decodeURIComponent(page.slug)}`;

    return redirectUrl;
  }

  /**
   * @function
   */
  @action
  handleAfterSignInEvent() {
    this.transitionToRoute('site.page.chats');
  }
}
