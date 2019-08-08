import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import Controller from '@ember/controller';

import toast from '@cenchat/ui/utils/toast';

/**
 * @namespace Controller
 */
export default class NewController extends Controller {
  /**
   * @type {Ember.Service}
   */
  @service('session')
  session;

  /**
   * @type {Ember.Service}
   */
  @service('store')
  store;

  /**
   * @type {Object}
   */
  newSiteData = {
    hostname: null,
    displayName: null,
    brandColor: null,
    theme: 'light',
  };

  /**
   * @type {boolean}
   */
  hasPendingSiteChanges = false;

  /**
   * @param {Object} data
   * @function
   */
  @action
  handleSiteUpdateEvent(data) {
    this.set('newSiteData', { ...this.newSiteData, ...data });
    this.set('hasPendingSiteChanges', true);
  }

  /**
   * @function
   */
  @action
  async handleSiteFormSubmit() {
    const currentUser = await this.store.findRecord(
      'user',
      this.session.data.authenticated.user.uid,
    );
    const newSite = this.store.createRecord('site', {
      ...this.newSiteData,
      isVerfified: false,
      imageUrl: null,
      name: this.newSiteData.displayName.toLowerCase(),
    });

    try {
      await newSite.save({
        adapterOptions: {
          include: (batch, db) => {
            const siteMembersDocRef = db
              .collection('sites')
              .doc(newSite.get('id'))
              .collection('members')
              .doc(currentUser.get('id'));
            const userDocRef = db.collection('users').doc(currentUser.get('id'));

            batch.set(siteMembersDocRef, {
              cloudFirestoreReference: userDocRef,
              role: 1,
              username: currentUser.get('username'),
            });

            const userSitesDocRef = db
              .collection('users')
              .doc(currentUser.get('id'))
              .collection('sites')
              .doc(newSite.get('id'));
            const siteDocRef = db.collection('sites').doc(newSite.get('id'));

            batch.set(userSitesDocRef, {
              cloudFirestoreReference: siteDocRef,
              name: newSite.get('name'),
              role: 1,
            });
          },
        },
      });

      this.set('hasPendingSiteChanges', false);
      this.transitionToRoute('sites');
      toast('Site created');
    } catch (error) {
      toast(error.message);
    }
  }
}
