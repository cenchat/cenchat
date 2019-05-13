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
   * @type {string}
   */
  hostname: DS.attr('string'),

  /**
   * @type {string}
   */
  imageUrl: DS.attr('string'),

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

  /**
   * @param {string} userId
   * @return {Promise.<boolean>} Resolves to true when user is an admin. Otherwise, false.
   * @function
   */
  async isAdmin(userId) {
    const db = this.firebase.firestore();
    const memberDocSnapshot = await db
      .collection('sites')
      .doc(this.get('id'))
      .collection('members')
      .doc(userId)
      .get();

    return memberDocSnapshot.exists && memberDocSnapshot.get('role') === 1;
  },

  /**
   * @param {string} userId
   * @return {Promise.<boolean>} Resolves to true when user is a member. Otherwise, false.
   * @function
   */
  async isMember(userId) {
    const db = this.firebase.firestore();
    const memberDocSnapshot = await db
      .collection('sites')
      .doc(this.get('id'))
      .collection('members')
      .doc(userId)
      .get();

    return memberDocSnapshot.exists;
  },
});
