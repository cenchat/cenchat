import { inject as service } from '@ember/service';
import Component from '@ember/component';

/**
 * @namespace Component
 */
export default class MainContentComponent extends Component {
  /**
   * @type {Ember.Service}
   */
  @service('router')
  router;

  /**
   * @override
   */
  tagName = '';
}
