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
    const mergedText = texts.join();
    const numOfNewLines = mergedText.split('\n').length;

    if (mergedText.length > 180 || (mergedText.length > 100 && numOfNewLines > 2)) {
      this.set('isReadMoreVisible', true);
    }
  },
});
