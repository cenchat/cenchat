import DS from 'ember-data';

/**
 * @namespace Model
 */
export default DS.Model.extend({
  /**
   * @type {Array.<Model.Chat>}
   */
  chats: DS.hasMany('chat', {
    isRealtime: true,

    filter(ref) {
      return ref.limit(8);
    },
  }),

  /**
   * @type {Date}
   */
  createdOn: DS.attr('timestamp'),

  /**
   * @type {string}
   */
  description: DS.attr('string'),

  /**
   * @type {string}
   */
  imageUrl: DS.attr('string'),

  /**
   * @type {Array.<Model.Chat>}
   */
  publicChats: DS.hasMany('chat', {
    inverse: null,
    isRealtime: true,

    buildReference(ref) {
      return ref.collection('chats');
    },

    filter(ref, record) {
      const pageDocRef = ref.firestore.doc(`pages/${record.get('id')}`);

      return ref.where('page', '==', pageDocRef).where('isPublic', '==', true).limit(8);
    },
  }),

  /**
   * @type {string}
   */
  slug: DS.attr('string'),

  /**
   * @type {string}
   */
  title: DS.attr('string'),

  /**
   * @type {Model.Site}
   */
  site: DS.belongsTo('site'),
});
