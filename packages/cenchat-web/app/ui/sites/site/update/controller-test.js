import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

import { setupAuthState, setupTestState } from '@cenchat/shared/test-support';

module('Unit | Controller | sites/site/update', function (hooks) {
  setupTest(hooks);

  hooks.beforeEach(async function () {
    setupTestState();

    const store = this.owner.lookup('service:store');
    const site = await store.findRecord('site', 'site_a');

    this.set('site', site);
  });

  test('should track if site has pending changes', function (assert) {
    assert.expect(1);

    // Arrange
    const controller = this.owner.lookup('controller:sites/site/update');

    controller.set('model', this.site);

    // Act
    controller.handleSiteUpdateEvent({ hostname: 'site-100.com' });

    // Arrange
    assert.deepEqual(controller.hasPendingSiteChanges, true);
  });

  test('should be able to handle update site data events', function (assert) {
    assert.expect(1);

    // Arrange
    const controller = this.owner.lookup('controller:sites/site/update');

    controller.set('model', this.site);

    // Act
    controller.handleSiteUpdateEvent({ hostname: 'site-100.com' });

    // Arrange
    assert.deepEqual(controller.newSiteData, {
      brandColor: '#212121',
      displayName: 'Site A',
      hostname: 'site-100.com',
      name: 'site a',
      theme: 'light',
    });
  });

  test('should be able to update the site', async function (assert) {
    assert.expect(1);

    // Arrange
    await setupAuthState({
      user: { uid: 'user_a' },
    });

    const controller = this.owner.lookup('controller:sites/site/update');

    controller.set('model', this.site);
    controller.set('newSiteData', {
      brandColor: '#ffffff',
      displayName: 'Site 100',
      theme: 'dark',
    });

    // Act
    await controller.handleSiteFormSubmit();

    // Arrange
    const db = this.owner.lookup('service:firebase').firestore();
    const siteDocSnapshot = await db.collection('sites').doc('site_a').get();

    assert.deepEqual(siteDocSnapshot.data(), {
      brandColor: '#ffffff',
      displayName: 'Site 100',
      hostname: 'site-a.com',
      imageUrl: 'site_a.jpg',
      name: 'site 100',
      theme: 'dark',
    });
  });
});
