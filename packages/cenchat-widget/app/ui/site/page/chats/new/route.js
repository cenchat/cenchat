import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';

/**
 * @namespace Route
 */
export default Route.extend({
  /**
   * @type {Ember.Service}
   */
  store: service('store'),

  /**
   * @override
   */
  model() {
    return {
      isPublic: false,
      page: this.modelFor('site.page'),
      site: this.modelFor('site'),
    };
  },
});
