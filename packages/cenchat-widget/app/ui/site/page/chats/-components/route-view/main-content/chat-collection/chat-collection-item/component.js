import Component from '@ember/component';

/**
 * @namespace
 */
export default Component.extend({
  /**
   * @override
   */
  tagName: '',

  /**
   * @type {boolean}
   */
  isReadMoreVisible: false,

  /**
   * @override
   */
  init(...args) {
    this._super(...args);

    this.setupIsReadMoreVisible();
  },

  /**
   * @function
   */
  async setupIsReadMoreVisible() {
    const first3Messages = await this.args.chat.get('first3Messages');
    const texts = first3Messages.map(message => message.get('text'));
    const mergedText = texts.join('\n');

    if (mergedText.length > 180) {
      this.set('isReadMoreVisible', true);
    }
  },
});
