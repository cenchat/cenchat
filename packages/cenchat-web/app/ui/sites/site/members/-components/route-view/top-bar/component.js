import { computed } from '@ember/object';
import Component from '@ember/component';

/**
 * @namespace Component
 */
export default class TopBarComponent extends Component {
  /**
   * @override
   */
  tagName = '';

  /**
   * @type {boolean}
   */
  @computed('args')
  get isSaveDisabled() {
    const arrayWithValues = Object.keys(this.args.pendingRoleChange).find(key => (
      this.args.pendingRoleChange[key].length > 0
    ));

    return !arrayWithValues;
  }
}
