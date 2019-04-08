import Component from '@ember/component';
import layout from '../templates/components/sign-in-card-view-verification-profile';

/**
 * @namespace Component
 */
export default Component.extend({
  /**
   * @override
   */
  layout,

  /**
   * @override
   */
  tagName: '',

  /**
   * @type {string}
   */
  fullName: null,
});
