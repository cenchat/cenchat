import CloudFirestoreAdapter from 'ember-cloud-firestore-adapter/adapters/cloud-firestore';

/**
 * @namespace Adapter
 */
export default CloudFirestoreAdapter.extend({
  // TODO: Remove once #93 of ember-cloud-firestore-adapter is merged
  firestoreSettings: null,
});
