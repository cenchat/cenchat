import Controller from '@ember/controller';

/**
 * @namespace Controller
 */
export default class SignInController extends Controller {
  /**
   * @type {string}
   */
  get redirectUrl() {
    return new URL(window.location).searchParams.get('redirect_url');
  }
}
