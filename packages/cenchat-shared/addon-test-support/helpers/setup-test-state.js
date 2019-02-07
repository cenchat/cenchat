import { getContext } from '@ember/test-helpers';
import { mockFirebase } from 'ember-cloud-firestore-adapter/test-support';

import getFixtureData from '../fixture-data';

/**
 * @function
 */
export function setupTestState() {
  const { owner } = getContext();

  mockFirebase(owner, getFixtureData());
}

/**
 * @param {Object} data
 * @function
 */
export async function setupAuthState(data) {
  const { owner } = getContext();
  const session = owner.lookup('service:session');

  session.set('data', { authenticated: data });
  session.set('isAuthenticated', true);

  // Preload user model
  const store = owner.lookup('service:store');

  await store.findRecord('user', data.user.uid);
}
