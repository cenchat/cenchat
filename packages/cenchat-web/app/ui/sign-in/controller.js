import Controller from '@ember/controller';

/**
 * @namespace Controller
 */
export default Controller.extend({
  /**
   * @function
   */
  handleAfterSignInEvent() {
    this.transitionToRoute('chats');
  },
});
