import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';

/**
 * @namespace
 */
export default class MembersRoute extends Route {
  /**
   * @type {Ember.Service}
   */
  @service('session')
  session;

  /**
   * @override
   */
  async beforeModel() {
    const site = this.modelFor('sites.site');
    const { uid: currentUserId } = this.session.data.authenticated.user;
    const isAdmin = await site.isAdmin(currentUserId);

    if (!isAdmin) {
      this.transitionTo('sites.site');
    }
  }

  /**
   * @override
   */
  async model() {
    const site = this.modelFor('sites.site');
    const [admins, moderators] = await Promise.all([site.get('admins'), site.get('moderators')]);

    return { admins, moderators };
  }
}
