import { click, fillIn, visit } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';

import { authenticateSession } from 'ember-simple-auth/test-support';
import { setupApplicationTestState } from '@cenchat/shared/test-support';

module('Acceptance | my-account/update-info', function (hooks) {
  setupApplicationTest(hooks);

  hooks.beforeEach(function () {
    setupApplicationTestState();
  });

  test('should be able to update the user profile', async function (assert) {
    assert.expect(1);

    // Arrange
    await authenticateSession({
      user: { uid: 'user_a' },
    });

    // Act
    await visit('/my-account/update-info');
    await fillIn('[data-test-info-form="display-name"] input', 'New Name');
    await click('[data-test-route-view="save-info-button"]');

    // Assert
    assert.dom('[data-test-update-info-card="name"]').hasText('New Name');
  });
});
