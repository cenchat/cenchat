import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';

/**
 * @namespace Route
 */
export default class ChatRoute extends Route {
  /**
   * @type {Ember.Service}
   */
  @service('store')
  store;

  /**
   * @override
   */
  async model(params) {
    return this.store.findRecord('chat', params.chat_id);
  }
}
