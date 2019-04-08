import { computed } from '@ember/object';
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
   * @type {string}
   */
  slug: computed({
    get() {
      const { slug } = this.paramsFor(this.routeName);

      return slug ? fixedEncodeURIComponent(slug) : null;
    },
  }),

  /**
   * @override
   */
  async beforeModel() {
    if (this.slug) {
      let page = await this.queryPage();

      if (!page) {
        page = await this.createPage();
      }

      this.transitionTo('site.page', page.get('id').split('__')[1]);
    }
  },

  /**
   * @return {Promise} Resolves to the page matching the query
   * @function
   * @private
   */
  async queryPage() {
    const pages = await this.store.query('page', {
      filter: (ref) => {
        const db = this.firebase.firestore();
        const siteId = this.modelFor('site').id;
        const siteDocRef = db.doc(`sites/${siteId}`);

        return ref.where('site', '==', siteDocRef).where('slug', '==', this.slug).limit(1);
      },
    });

    return pages.firstObject;
  },

  /**
   * @return {Promise} Resolves to the created page
   * @function
   * @private
   */
  async createPage() {
    const config = getOwner(this).resolveRegistration('config:environment');
    const siteId = this.modelFor('site').id;
    const db = this.firebase.firestore();
    const postfixId = db.collection('pages').doc().id;
    const page = { id: `${siteId}__${postfixId}`, site: siteId, slug: this.slug };

    await fetch(`${config.apiHost}/pages`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...page, site: `sites/${siteId}` }),
    });

    return this.store.findRecord('page', page.id);
  },
});
