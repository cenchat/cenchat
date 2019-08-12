import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';

/**
 * @namespace Route
 */
export default class ChatRoute extends Route {
  /**
   * @type {Ember.Service}
   */
  @service('firebase')
  firebase;

  /**
   * @type {Ember.Service}
   */
  @service('session')
  session;

  /**
   * @type {Ember.Service}
   */
  @service('store')
  store;

  /**
   * @override
   */
  model(params) {
    return this.store.findRecord('chat', params.chat_id);
  }

  /**
   * @override
   */
  async afterModel(model) {
    // Preload site and page
    await Promise.all([model.get('site'), model.get('page')]);
  }
}
