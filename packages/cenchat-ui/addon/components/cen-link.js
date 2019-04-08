import { inject as service } from '@ember/service';
import Component from '@ember/component';

import layout from '../templates/components/cen-link';

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
  attributeBindings: ['href'],

  /**
   * @override
   */
  click(event) {
    event.preventDefault();

    const href = this.element.getAttribute('href');

    this.router.transitionTo(href);
  },
});
