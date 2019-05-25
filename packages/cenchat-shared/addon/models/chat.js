import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import DS from 'ember-data';

/**
 * @namespace Model
 */
export default DS.Model.extend({
  /**
   * @type {Ember.Service}
   */
  firebase: service('firebase'),

  /**
   * @type {Ember.Service}
   */
  session: service('session'),

  /**
   * @type {Model.User}
   */
  creator: DS.belongsTo('user'),

  /**
   * @type {Array.<Model.Message>}
   */
  descendingMessages: DS.hasMany('message', {
    inverse: null,
    isRealtime: true,

    buildReference(db) {
      return db.collection('messages');
    },

    filter(ref, record) {
      const chatDocRef = ref.firestore.doc(`chats/${record.get('id')}`);

      return ref
        .where('chat', '==', chatDocRef)
        .orderBy('createdOn', 'desc')
        .limit(record.get('hasManyLimit.descendingMessages'));
    },
  }),

  /**
   * @type {boolean}
   */
  isPublic: DS.attr('boolean'),

  /**
   * @type {timestamp}
   */
  lastActivityTimestamp: DS.attr('timestamp'),

  /**
   * @type {Model.Message}
   */
  lastMessage: DS.belongsTo('message', { inverse: null }),

  /**
   * @type {Array.<Model.Message>}
   */
  first3Messages: DS.hasMany('message', {
    inverse: null,

    buildReference(db) {
      return db.collection('messages');
    },

    filter(ref, record) {
      const chatDocRef = ref.firestore.doc(`chats/${record.get('id')}`);

      return ref.where('chat', '==', chatDocRef).orderBy('createdOn').limit(3);
    },
  }),

  /**
   * @type {Array.<Model.Message>}
   */
  messages: DS.hasMany('message', {
    isRealtime: true,

    filter(ref, record) {
      return ref.orderBy('createdOn').limit(record.get('hasManyLimit.messages'));
    },
  }),

  /**
   * @type {Model.Page}
   */
  page: DS.belongsTo('page'),

  /**
   * @type {Model.Site}
   */
  site: DS.belongsTo('site'),

  /**
   * @type {Object}
   */
  hasManyLimit: { descendingMessages: 16, messages: 16 },

  /**
   * @type {boolean}
   */
  isUnread: computed('lastActivityTimestamp', {
    get() {
      if (this.session.isAuthenticated) {
        const { uid } = this.session.data.authenticated.user;

        return this.firebase.firestore()
          .collection('users')
          .doc(uid)
          .collection('unreadChats')
          .doc(this.get('id'))
          .get()
          .then(snapshot => snapshot.exists);
      }

      return Promise.resolve(false);
    },
  }),

  /**
   * @type {Array.<Model.Messages>}
   */
  reverseDescendingMessages: computed('descendingMessages', {
    get() {
      return this.descendingMessages.reverseObjects();
    },
  }),
});
