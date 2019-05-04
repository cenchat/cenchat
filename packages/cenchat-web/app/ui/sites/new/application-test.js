import { click, fillIn, visit } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';

import { setupAuthState, setupApplicationTestState } from '@cenchat/shared/test-support';

module('Acceptance | sites/new', function (hooks) {
  setupApplicationTest(hooks);

  hooks.beforeEach(function () {
    setupApplicationTestState();
  });

  test('should be able to create a new site', async function (assert) {
    assert.expect(1);

    // Arrange
    await setupAuthState({
      user: { uid: 'user_a' },
    });

    // Act
    await visit('/sites/new');
    await fillIn('[data-test-site-form="hostname"] input', 'site-100.jpg');
    await fillIn('[data-test-site-form="name"] input', 'Site 100');
    await fillIn('[data-test-site-form="brand-color"] input', '#ffffff');
    await fillIn('[data-test-site-form="theme"] select', 'dark');
    await click('[data-test-top-bar="save-button"]');

    // Assert
    assert.dom('[data-test-application="toast"]').hasText('Site created');
  });
});
