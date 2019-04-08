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
  displayName: DS.attr('string'),

  /**
   * @type {string}
   */
  displayUsername: DS.attr('string'),

  /**
   * @type {string}
   */
  name: DS.attr('string'),

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
});
