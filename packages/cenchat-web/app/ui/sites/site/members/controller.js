import { getOwner } from '@ember/application';
import { inject as service } from '@ember/service';
import Controller from '@ember/controller';

import fetch from 'fetch';
import toast from '@cenchat/ui/utils/toast';

/**
 * @namespace Controller
 */
export default Controller.extend({
  /**
   * @type {Ember.Service}
   */
  firebase: service('firebase'),

  /**
   * @type {Ember.Service}
   */
  router: service('router'),

  /**
   * @type {Ember.Service}
   */
  session: service('session'),

  /**
   * @type {Ember.Service}
   */
  store: service('store'),

  /**
   * @type {Object}
   */
  pendingRoleChange: {
    admins: [],
    moderators: [],
    none: [],
  },

  /**
   * @type {Array.<Model.User>}
   */
  searchedUsers: [],

  /**
   * @type {string}
   */
  latestSearchUserQuery: null,

  /**
   * @param {Model.User} user
   * @param {string} role
   * @function
   */
  handleRoleChange(user, role) {
    const newPendingRoleChange = { ...this.pendingRoleChange };

    Object.keys(this.pendingRoleChange).forEach((key) => {
      if (role !== key) {
        newPendingRoleChange[key] = newPendingRoleChange[key].filter(id => id !== user.get('id'));
      }
    });

    if (role !== 'none' || this.isMember(user)) {
      newPendingRoleChange[role] = [...newPendingRoleChange[role], user.get('id')];
    }

    this.set('pendingRoleChange', newPendingRoleChange);
  },

  /**
   * @override
   */
  async handleSaveRolesClick() {
    const config = getOwner(this).resolveRegistration('config:environment');
    const token = await this.session.data.authenticated.user.getIdToken();
    const { attributes: site } = this.router.currentRoute.parent;
    const response = await fetch(`${config.apiHost}/utils/update-site-roles`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        siteId: site.get('id'),
        roleChange: this.pendingRoleChange,
      }),
    });

    if (response.ok) {
      this.set('pendingRoleChange', {
        admins: [],
        moderators: [],
        none: [],
      });
      this.transitionToRoute('sites.site');
      toast('Roles saved');
    } else {
      const data = await response.text();

      toast(data);
    }
  },

  /**
   * @param {string} query
   * @function
   */
  async handleSearchUserInput(query) {
    this.set('latestSearchUserQuery', query);

    const users = await this.store.query('user', {
      filter(ref) {
        const lowerCasedQuery = query.toLowerCase();

        return ref
          .orderBy('username')
          .startAt(lowerCasedQuery)
          .endAt(`${lowerCasedQuery}\uf8ff`)
          .limit(4);
      },
    });

    if (query === this.latestSearchUserQuery) {
      const searchedUsers = users.filter(user => !this.isMember(user));

      this.set('searchedUsers', searchedUsers);
    }
  },

  /**
   * @param {Model.User} user
   * @return {boolean} True if user is already a member. Otherwise, false.
   * @function
   */
  isMember(user) {
    return this.model.admins.includes(user) || this.model.moderators.includes(user);
  },
});
