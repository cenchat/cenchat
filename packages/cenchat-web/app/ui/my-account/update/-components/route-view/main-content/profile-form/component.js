import { action } from '@ember/object';
import Component from '@ember/component';

/**
 * @namespace
 */
export default class ProfileFormComponent extends Component {
  /**
   * @override
   */
  tagName = '';

  /**
   * @param {string} value
   * @function
   */
  @action
  handleDisplayUsernameInput(value) {
    this.args.onProfileUpdateEvent({ displayUsername: value });
  }
}
