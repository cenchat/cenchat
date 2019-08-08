import Route from '@ember/routing/route';

/**
 * @namespace Route
 */
export default class UpdateRoute extends Route {
  /**
   * @override
   */
  model() {
    return this.modelFor('my-account');
  }
}
