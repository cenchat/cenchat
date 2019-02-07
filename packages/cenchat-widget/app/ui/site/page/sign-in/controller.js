import { computed } from '@ember/object';
import Controller from '@ember/controller';

/**
 * @namespace Controller
 */
export default Controller.extend({
  /**
   * @type {string}
   */
  redirectUrl: computed({
    get() {
      const page = this.model;
      const redirectUrl = `http://${page.get('site.hostname')}${decodeURIComponent(page.slug)}`;

      return redirectUrl;
    },
  }),

  /**
   * @function
   */
  handleAfterSignInEvent() {
    this.transitionToRoute('site.page.chats');
  },
});
