import { inject as service } from '@ember/service';
import Component from '@ember/component';

import layout from '../templates/components/sign-in-card-view';

/**
 * @namespace Component
 */
export default Component.extend({
  /**
   * @override
   */
  layout,

  /**
   * @type {Ember.Service}
   */
  firebase: service('firebase'),

  /**
   * @override
   */
  tagName: '',

  /**
   * @type {boolean}
   */
  isSignInWithEmailLink: false,

  /**
   * @override
   */
  init(...args) {
    this._super(...args);

    if (this.firebase.auth().isSignInWithEmailLink(window.location.href)) {
      this.set('isSignInWithEmailLink', true);
    }
  },
});
