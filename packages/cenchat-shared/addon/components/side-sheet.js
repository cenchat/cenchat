import Component from '@ember/component';

/**
 * @namespace Component
 */
export default Component.extend({
  /**
   * @override
   */
  tagName: 'section',

  /**
   * @override
   */
  classNames: ['side-sheet'],

  /**
   * @override
   */
  didInsertElement(...args) {
    this._super(...args);

    document.documentElement.style.setProperty('overflow', 'hidden');
  },

  /**
   * @override
   */
  willDestroyElement(...args) {
    this._super(...args);

    document.documentElement.style.removeProperty('overflow');
  },
});
