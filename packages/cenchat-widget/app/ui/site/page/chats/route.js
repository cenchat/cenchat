import Route from '@ember/routing/route';

/**
 * @namespace Route
 */
export default Route.extend({
  /**
   * @override
   */
  async model() {
    const page = this.modelFor('site.page');

    return page.get('publicChats');
  },
});
