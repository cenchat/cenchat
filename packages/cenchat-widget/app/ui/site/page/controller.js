import { inject as service } from '@ember/service';
import Controller from '@ember/controller';

/**
 * @namespace Controller
 */
export default Controller.extend({
  /**
   * @type {Ember.Service}
   */
  session: service('session'),
});
