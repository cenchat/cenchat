import Route from '@ember/routing/route';

/**
 * @namespace Route
 */
export default class SignInRoute extends Route {
  /**
   * @override
   */
  model() {
    return this.modelFor('site.page');
  }
}
