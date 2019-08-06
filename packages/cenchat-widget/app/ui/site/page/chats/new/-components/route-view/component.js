import { inject as service } from '@ember/service';
import Component from '@ember/component';

/**
 * @namespace Component
 */
export default class RouteViewComponent extends Component {
  /**
   * @type {Ember.Service}
   */
  @service('session')
  session;

  /**
   * @override
   */
  tagName = '';
}
