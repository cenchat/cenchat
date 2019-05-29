import Component from '@ember/component';
import EmberObject from '@ember/object';

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
  classNames: ['site-form-preview'],

  /**
   * @override
   */
  classNameBindings: ['args.theme'],

  /**
   * @type {string}
   */
  'data-test-site-form-preview': 'host',

  /**
   * @type {Array.<Object>}
   */
  previewMessages: [
    EmberObject.create({
      author: EmberObject.create({ id: 'johndoe', displayUsername: 'JohnDoe', isLoaded: true }),
      chat: EmberObject.create({
        creator: EmberObject.create({ id: 'johndoe' }),
      }),
      createdOn: new Date('2018-01-01'),
      isNew: false,
      text: 'Hi. Do you support dark theme?',
    }),
    EmberObject.create({
      author: EmberObject.create({ id: 'kriskelly', displayUsername: 'KrisKelly', isLoaded: true }),
      chat: EmberObject.create({
        creator: EmberObject.create({ id: 'johndoe' }),
      }),
      createdOn: new Date('2018-01-02'),
      isNew: false,
      text: 'Yes, dark theme is supported. :)',
    }),
  ],

  /**
   * @override
   */
  didInsertElement(...args) {
    this._super(...args);

    this.element.querySelector('.site-form-preview__card').style.setProperty(
      '--brand-color',
      this.args.brandColor,
    );
  },

  /**
   * @override
   */
  didUpdate(...args) {
    this._super(...args);

    this.element.querySelector('.site-form-preview__card').style.setProperty(
      '--brand-color',
      this.args.brandColor,
    );
  },
});
