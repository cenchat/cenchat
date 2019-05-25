import { assign } from '@ember/polyfills';
import Helper from '@ember/component/helper';

/**
 * @namespace Helper
 */
export default Helper.extend({
  /**
   * @type {Object}
   */
  state: { content: null, isFulfilled: false, property: null },

  /**
   * @override
   */
  compute([property]) {
    if (this.didPropertyChange(property)) {
      this.set('state', {
        property,
        content: null,
        isFulfilled: false,
      });
    }

    if (!this.state.isFulfilled) {
      property.then((result) => {
        const newState = assign({}, this.state, {
          content: result,
          isFulfilled: true,
        });

        this.set('state', newState);

        this.recompute();
      });
    }

    return this.state.content;
  },

  /**
   * @param {*} property
   * @return {boolean} True if changed. Otherwise, false.
   * @function
   */
  didPropertyChange(property) {
    if (this.state.property === property) {
      return false;
    }

    return true;
  },
});
