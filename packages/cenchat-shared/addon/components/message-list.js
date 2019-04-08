import { computed } from '@ember/object';
import Component from '@ember/component';

import moment from 'moment';

import layout from '../templates/components/message-list';

/**
 * @namespace Component
 */
export default Component.extend({
  /**
   * @override
   */
  layout,

  /**
   * @override
   */
  tagName: '',

  /**
   * @type {Array.<Object>}
   */
  sortedMessages: computed('args.messages.@each.isNew', {
    get() {
      const messages = this.args.messages || [];

      return messages.filterBy('isNew', false);
    },
  }),

  /**
   * @type {Array.<Array>}
   */
  messageGroups: computed('sortedMessages', {
    get() {
      const messageGroups = [];

      this.sortedMessages.forEach((message) => {
        const lastMessageGroup = messageGroups[messageGroups.length - 1];

        if (lastMessageGroup && lastMessageGroup.author.get('id') === message.get('author.id')) {
          const startTime = moment(lastMessageGroup.timestamp);
          const endTime = moment(lastMessageGroup.timestamp).add(15, 'minutes');
          const messageTime = moment(message.get('createdOn'));

          if (messageTime.isBetween(startTime, endTime, null, '[]')) {
            lastMessageGroup.messages.push(message);
          } else {
            messageGroups.push({
              author: message.get('author'),
              timestamp: message.get('createdOn'),
              messages: [message],
            });
          }
        } else {
          messageGroups.push({
            author: message.get('author'),
            timestamp: message.get('createdOn'),
            messages: [message],
          });
        }
      });

      return messageGroups;
    },
  }),
});
