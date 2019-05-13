import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import Component from '@ember/component';

import layout from '../templates/components/cen-link-button';

/**
 * @namespace Component
 */
export default Component.extend({
  /**
   * @override
   */
  router: service('router'),

  /**
   * @override
   */
  layout,

  /**
   * @override
   */
  tagName: 'a',

  /**
   * @override
   */
  classNameBindings: ['isRouteActive:active'],

  /**
   * @override
   */
  attributeBindings: ['href', 'target', 'rel'],

  /**
   * @override
   */
  classNames: ['cen-link-button'],

  /**
   * @type {boolean}
   */
  isRouteActive: computed('router.currentURL', {
    get() {
      const href = this.element.getAttribute('href');

      if (this.router.currentURL) {
        if (href !== '/') {
          return this.router.currentURL.includes(href);
        }

        return this.router.currentURL === href;
      }

      return false;
    },
  }),

  /**
   * @override
   */
  click(event) {
    const href = this.element.getAttribute('href');

    if (!href.startsWith('http')) {
      event.preventDefault();

      this.router.transitionTo(href);
    }
  },
});
