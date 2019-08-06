import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';

/**
 * @namespace Route
 */
export default class SiteRoute extends Route {
  /**
   * @type {Ember.Service}
   */
  @service('store')
  store;

  /**
   * @override
   */
  model(params) {
    return this.store.findRecord('site', params.site_id);
  }

  /**
   * @override
   */
  afterModel(model) {
    document.body.classList.remove('light-theme');
    document.body.classList.add(`${model.get('theme')}-theme`);
    document.documentElement.style.setProperty('--brand-color', model.get('brandColor'));
  }
}
