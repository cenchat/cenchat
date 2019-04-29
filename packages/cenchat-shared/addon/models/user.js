import DS from 'ember-data';

/**
 * @namespace Model
 */
export default DS.Model.extend({
  /**
   * @type {Array.<Model.Chat>}
   */
  chats: DS.hasMany('chat'),

  /**
   * @type {string}
   */
  displayUsername: DS.attr('string'),

  /**
   * @type {Array.<Model.Chat>}
   */
  latestActiveChats: DS.hasMany('chat', {
    inverse: null,
    isRealtime: true,

    buildReference(db, record) {
      return db.collection(`users/${record.get('id')}/chats`);
    },

    filter(ref, record) {
      const limit = record.get('hasManyLimit.latestActiveChats');

      return ref.orderBy('lastActivityTimestamp', 'desc').limit(limit);
    },
  }),

  /**
   * @type {string}
   */
  photoUrl: DS.attr('string'),

  /**
   * @type {string}
   */
  shortBio: DS.attr('string'),

  /**
   * @type {string}
   */
  username: DS.attr('string'),

  /**
   * @type {Object}
   */
  hasManyLimit: { latestActiveChats: 16 },
});
