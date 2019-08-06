import { inject as service } from '@ember/service';
import Controller from '@ember/controller';

/**
 * @namespace Controller
 */
export default class PageController extends Controller {
  /**
   * @type {Ember.Service}
   */
  @service('session')
  session;
}
