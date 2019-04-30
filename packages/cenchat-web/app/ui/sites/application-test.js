import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import { visit } from '@ember/test-helpers';

import { setupAuthState, setupApplicationTestState } from '@cenchat/shared/test-support';

module('Acceptance | sites', function (hooks) {
  setupApplicationTest(hooks);

  hooks.beforeEach(function () {
    setupApplicationTestState();
  });

  test('should list the sites the user is an admin of', async function (assert) {
    assert.expect(1);

    // Arrange
    await setupAuthState({
      user: { uid: 'user_a' },
    });

    // Act
    await visit('/sites');

    // Assert
    assert.dom('[data-test-site-collection-item="host"]').exists({ count: 1 });
  });
});
