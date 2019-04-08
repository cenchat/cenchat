import { getOwner } from '@ember/application';
import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';

import fetch from 'fetch';

import fixedEncodeURIComponent from 'cenchat-widget/utils/fixed-encode-uri-component';

/**
 * @namespace Route
 */
export default Route.extend({
  /**
   * @type {Ember.Service}
   */
  firebase: service('firebase'),

  /**
   * @type {Ember.Service}
   */
  store: service('store'),

  /**
   * @override
   */
  queryParams: {
    slug: { as: 'slug' },
  },

  /**
   * @override
   */
  model(params) {
    return this.findOrCreatePage(params);
  },

  /**
   * @override
   */
  redirect(model, transition) {
    if (model && transition.targetName === 'site.page.index') {
      this.transitionTo('site.page.chats');
    }
  },

  /**
   * @param {Object} params
   * @return {Promise} Resolves to the page
   * @function
   */
  async findOrCreatePage(params) {
    let page = await this.getPage(params);

    if (!page) {
      page = await this.createPage(params);
    }

    return page;
  },

  /**
   * @param {Object} params
   * @return {Promise} Resolves to the fetched page if it exists
   * @function
   */
  getPage(params) {
    const site = this.modelFor('site');
    const pageId = `${site.id}__${params.page_postfix_id}`;

    return this.store.findRecord('page', pageId).catch(() => null);
  },

  /**
   * @param {Object} params
   * @return {Promise} Resolves to the created page
   * @function
   */
  async createPage(params) {
    const { slug } = this.paramsFor(this.routeName);

    if (slug) {
      const config = getOwner(this).resolveRegistration('config:environment');
      const siteId = this.modelFor('site').id;
      const page = {
        id: `${siteId}__${params.page_postfix_id}`,
        site: siteId,
        slug: fixedEncodeURIComponent(slug),
      };

      await fetch(`${config.apiHost}/pages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...page, site: `sites/${siteId}` }),
      });

      return this.store.findRecord('page', page.id);
    }

    return null;
  },
});
