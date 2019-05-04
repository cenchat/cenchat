import Component from '@ember/component';

/**
 * @namespace Component
 */
export default Component.extend({
  /**
   * @override
   */
  tagName: '',

  /**
   * @type {string}
   */
  brandColor: null,

  /**
   * @type {string}
   */
  theme: 'light',

  /**
   * @override
   */
  init(...args) {
    this._super(...args);

    if (this.args.site) {
      this.set('brandColor', this.args.site.get('brandColor'));
      this.set('theme', this.args.site.get('theme'));
    }
  },

  /**
   * @param {string} value
   * @function
   */
  handleHostnameInput(value) {
    this.args.onSiteUpdateEvent({ hostname: value });
  },

  /**
   * @param {string} value
   * @function
   */
  handleNameInput(value) {
    this.args.onSiteUpdateEvent({ displayName: value });
  },

  /**
   * @param {string} value
   * @function
   */
  handleBrandColorInput(value) {
    this.args.onSiteUpdateEvent({ brandColor: value });
    this.set('brandColor', value);
  },

  /**
   * @param {string} value
   * @function
   */
  handleThemeChange(value) {
    this.args.onSiteUpdateEvent({ theme: value });
    this.set('theme', value);
  },
});
