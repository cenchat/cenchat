import DS from 'ember-data';

/**
 * @namespace Model
 */
export default DS.Model.extend({
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
   * @type {boolean}
   */
  isVerified: DS.attr('boolean'),

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
