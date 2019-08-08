import { action } from '@ember/object';
import Component from '@ember/component';

/**
 * @namespace Component
 */
export default class SiteFormComponent extends Component {
  /**
   * @override
   */
  tagName = '';

  /**
   * @type {string}
   */
  brandColor = null;

  /**
   * @type {string}
   */
  theme = 'light';

  /**
   * @override
   */
  init(...args) {
    super.init(...args);

    if (this.args.site) {
      this.set('brandColor', this.args.site.get('brandColor'));
      this.set('theme', this.args.site.get('theme'));
    }
  }

  /**
   * @param {string} value
   * @function
   */
  @action
  handleHostnameInput(value) {
    this.args.onSiteUpdateEvent({ hostname: value });
  }

  /**
   * @param {string} value
   * @function
   */
  @action
  handleNameInput(value) {
    this.args.onSiteUpdateEvent({ displayName: value });
  }

  /**
   * @param {string} value
   * @function
   */
  @action
  handleBrandColorInput(value) {
    this.args.onSiteUpdateEvent({ brandColor: value });
    this.set('brandColor', value);
  }

  /**
   * @param {string} value
   * @function
   */
  @action
  handleThemeChange(value) {
    this.args.onSiteUpdateEvent({ theme: value });
    this.set('theme', value);
  }
}
