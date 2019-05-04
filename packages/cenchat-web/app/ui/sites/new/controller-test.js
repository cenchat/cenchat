import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

import { setupAuthState, setupTestState } from '@cenchat/shared/test-support';

module('Unit | Controller | sites/new', function (hooks) {
  setupTest(hooks);

  hooks.beforeEach(async function () {
    setupTestState();
  });

  test('should track if site has pending changes', function (assert) {
    assert.expect(1);

    // Arrange
    const controller = this.owner.lookup('controller:sites/new');

    // Act
    controller.handleSiteUpdateEvent({ hostname: 'site-100.jpg' });

    // Arrange
    assert.deepEqual(controller.hasPendingSiteChanges, true);
  });

  test('should be able to handle update user profile events', function (assert) {
    assert.expect(1);

    // Arrange
    const controller = this.owner.lookup('controller:sites/new');

    // Act
    controller.handleSiteUpdateEvent({ hostname: 'site-100.jpg' });

    // Arrange
    assert.deepEqual(controller.newSiteData, {
      hostname: 'site-100.jpg',
      displayName: null,
      brandColor: null,
      theme: 'light',
    });
  });

  test('should be able to create a new site', async function (assert) {
    assert.expect(4);

    // Arrange
    await setupAuthState({
      user: { uid: 'user_a' },
    });

    const controller = this.owner.lookup('controller:sites/new');

    controller.set('newSiteData', {
      id: 'site_100', // Not really passed-in, only for this test case
      hostname: 'site-100.jpg',
      displayName: 'Site 100',
      brandColor: '#ffffff',
      theme: 'dark',
    });

    // Act
    await controller.handleSiteFormSubmit();

    // Arrange
    const db = this.owner.lookup('service:firebase').firestore();
    const siteDocSnapshot = await db.collection('sites').doc('site_100').get();

    assert.deepEqual(siteDocSnapshot.data(), {
      brandColor: '#ffffff',
      displayName: 'Site 100',
      hostname: 'site-100.jpg',
      imageUrl: null,
      isVerified: false,
      name: 'site 100',
      theme: 'dark',
    });

    // TODO: Fix creating new collection with batch doesn't work in mock-cloud-firestore
    // const siteMemberDocSnapshot = await db
    //   .collection('sites')
    //   .doc('site_100')
    //   .collection('members')
    //   .doc('user_a')
    //   .get();

    // assert.ok(siteMemberDocSnapshot.get('cloudFirestoreReference'));
    // assert.equal(siteMemberDocSnapshot.get('role'), 1);
    // assert.equal(siteMemberDocSnapshot.get('username'), 'user a');

    const userSiteDocSnapshot = await db
      .collection('users')
      .doc('user_a')
      .collection('sites')
      .doc('site_100')
      .get();

    assert.ok(userSiteDocSnapshot.get('cloudFirestoreReference'));
    assert.equal(userSiteDocSnapshot.get('role'), 1);
    assert.equal(userSiteDocSnapshot.get('name'), 'site 100');
  });
});
