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
      return new URL(window.location).searchParams.get('redirect_url');
    },
  }),
});
