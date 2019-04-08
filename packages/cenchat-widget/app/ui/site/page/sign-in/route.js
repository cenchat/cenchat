import Route from '@ember/routing/route';

/**
 * @namespace Route
 */
export default Route.extend({
  /**
   * @override
   */
  model() {
    return this.modelFor('site.page');
  },
});
