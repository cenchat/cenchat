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
  model(params) {
    return this.store.findRecord('site', params.site_id);
  },

  /**
   * @override
   */
  afterModel(model) {
    document.body.classList.remove('light-theme');
    document.body.classList.add(`${model.theme}-theme`);
    document.documentElement.style.setProperty('--brand-color', model.brandColor);
  },
});
