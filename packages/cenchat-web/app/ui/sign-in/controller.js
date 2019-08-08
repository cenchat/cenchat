import { action } from '@ember/object';
import Controller from '@ember/controller';

/**
 * @namespace Controller
 */
export default class SignInController extends Controller {
  /**
   * @function
   */
  @action
  handleAfterSignInEvent() {
    this.transitionToRoute('chats');
  }
}
