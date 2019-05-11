import { computed } from '@ember/object';
import Component from '@ember/component';

export default Component.extend({
  /**
   * @override
   */
  tagName: '',

  /**
   * @type {boolean}
   */
  isSaveDisabled: computed('args', {
    get() {
      const arrayWithValues = Object.keys(this.args.pendingRoleChange).find(key => (
        this.args.pendingRoleChange[key].length > 0
      ));

      return !arrayWithValues;
    },
  }),
});
