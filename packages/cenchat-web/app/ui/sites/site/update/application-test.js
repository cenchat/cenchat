import { click, fillIn, visit } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';

import { setupAuthState, setupApplicationTestState } from '@cenchat/shared/test-support';

module('Acceptance | sites/site/update', function (hooks) {
  setupApplicationTest(hooks);

  hooks.beforeEach(function () {
    setupApplicationTestState();
  });

  test('should be able to update the site when current user is an admin', async function (assert) {
    assert.expect(1);

    // Arrange
    await setupAuthState({
      user: { uid: 'user_a' },
    });

    // Act
    await visit('/sites/site_a/update');
    await fillIn('[data-test-site-form="name"] input', 'Site 100');
    await fillIn('[data-test-site-form="brand-color"] input', '#ffffff');
    await fillIn('[data-test-site-form="theme"] select', 'dark');
    await click('[data-test-top-bar="save-button"]');

    // Assert
    assert.dom('[data-test-application="toast"]').hasText('Site updated');
  });
});
