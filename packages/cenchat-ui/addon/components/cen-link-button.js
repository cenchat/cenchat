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
  attributeBindings: ['href'],

  /**
   * @override
   */
  classNames: ['cen-link-button'],

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
