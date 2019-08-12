import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import Component from '@ember/component';

/**
 * @namespace Component
 */
export default class RouteViewComponent extends Component {
  /**
   * @type {Ember.Service}
   */
  @service('firebase')
  firebase;

  /**
   * @type {Ember.Service}
   */
  @service('session')
  session;

  /**
   * @override
   */
  tagName = '';

  /**
   * @param  {...any} args
   * @function
   */
  @action
  async handleSendMessageClick(...args) {
    const element = document.querySelector('#chats-chat_route-view__main-content');

    element.scrollTop = element.scrollHeight;

    await this.onSendMessageEvent(...args);
  }
}
