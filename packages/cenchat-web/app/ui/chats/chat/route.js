import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';

/**
 * @namespace Route
 */
export default Route.extend({
  /**
   * @type {Ember.Service}
   */
  firebase: service('firebase'),

  /**
   * @type {Ember.Service}
   */
  session: service('session'),

  /**
   * @type {Ember.Service}
   */
  store: service('store'),

  /**
   * @override
   */
  model(params) {
    return this.store.findRecord('chat', params.chat_id);
  },

  /**
   * @override
   */
  async afterModel(model) {
    // Preload site and page
    await Promise.all([model.get('site'), model.get('page')]);
  },
});
