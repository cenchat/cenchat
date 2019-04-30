import DS from 'ember-data';

/**
 * @namespace Model
 */
export default DS.Model.extend({
  /**
   * @type {Array.<Model.User>}
   */
  admins: DS.hasMany('user', {
    inverse: 'sitesAsAdmin',
    isRealtime: true,

    buildReference(db, record) {
      return db.collection(`sites/${record.get('id')}/members`);
    },

    filter(ref) {
      return ref.where('role', '==', 1);
    },
  }),

  /**
   * @type {string}
   */
  brandColor: DS.attr('string'),

  /**
   * @type {Array.<Model.Chat>}
   */
  chats: DS.hasMany('chat'),

  /**
   * @type {string}
   */
  displayName: DS.attr('string'),

  /**
   * @type {Array.<Model.User>}
   */
  editors: DS.hasMany('user', {
    inverse: 'sitesAsEditor',
    isRealtime: true,

    buildReference(db, record) {
      return db.collection(`sites/${record.get('id')}/members`);
    },

    filter(ref) {
      return ref.where('role', '==', 2);
    },
  }),

  /**
   * @type {string}
   */
  hostname: DS.attr('string'),

  /**
   * @type {string}
   */
  imageUrl: DS.attr('string'),

  /**
   * @type {boolean}
   */
  isVerified: DS.attr('boolean'),

  /**
   * @type {Array.<Model.User>}
   */
  moderators: DS.hasMany('user', {
    inverse: 'sitesAsModerator',
    isRealtime: true,

    buildReference(db, record) {
      return db.collection(`sites/${record.get('id')}/members`);
    },

    filter(ref) {
      return ref.where('role', '==', 3);
    },
  }),

  /**
   * @type {string}
   */
  name: DS.attr('string'),

  /**
   * @type {string}
   */
  theme: DS.attr('string'),

  /**
   * @type {Array.<Model.Page>}
   */
  pages: DS.hasMany('page'),
});
