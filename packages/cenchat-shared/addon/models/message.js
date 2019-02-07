import DS from 'ember-data';

/**
 * @namespace Model
 */
export default DS.Model.extend({
  /**
   * @type {Model.User}
   */
  author: DS.belongsTo('user'),

  /**
   * @type {Model.Chat}
   */
  chat: DS.belongsTo('chat'),

  /**
   * @type {firebase.firestore.FieldValue.SeverTimestamp}
   */
  createdOn: DS.attr('timestamp'),

  /**
   * @type {string}
   */
  media: DS.attr('string'),

  /**
   * @type {string}
   */
  text: DS.attr('string'),
});
