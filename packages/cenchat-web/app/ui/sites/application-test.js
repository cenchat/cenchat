import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import { visit } from '@ember/test-helpers';

import { setupAuthState, setupApplicationTestState } from '@cenchat/shared/test-support';

module('Acceptance | sites', function (hooks) {
  setupApplicationTest(hooks);

  hooks.beforeEach(function () {
    setupApplicationTestState();
  });

  test('should show the sites the current user is an admin of', async function (assert) {
    assert.expect(1);

    // Arrange
    await setupAuthState({
      user: { uid: 'user_a' },
    });

    // Act
    await visit('/sites');

    // Assert
    assert.dom('[data-test-main-content="admin-sites"] [data-test-site-collection="host"]').exists();
  });

  test('should show the sites the current user is a moderator of', async function (assert) {
    assert.expect(1);

    // Arrange
    await setupAuthState({
      user: { uid: 'user_a' },
    });

    // Act
    await visit('/sites');

    // Assert
    assert.dom('[data-test-main-content="moderator-sites"] [data-test-site-collection="host"]').exists();
  });
});
