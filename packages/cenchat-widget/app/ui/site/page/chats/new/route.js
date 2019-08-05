import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';

/**
 * @namespace Route
 */
export default class NewRoute extends Route {
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
  async beforeModel() {
    if (this.session.isAuthenticated) {
      try {
        const page = this.modelFor('site.page');
        const { uid } = this.session.data.authenticated.user;
        const chat = await this.store.findRecord('chat', `${page.get('id')}__${uid}`);

        this.replaceWith('site.page.chats.chat', chat.get('id'));
      } catch (error) {
        // Do nothing
      }
    }
  }

  /**
   * @override
   */
  model() {
    return {
      isPublic: false,
      page: this.modelFor('site.page'),
      site: this.modelFor('site'),
    };
  }
}
