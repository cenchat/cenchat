import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

import { setupAuthState, setupTestState } from '@cenchat/shared/test-support';

module('Unit | Route | sites', function (hooks) {
  setupTest(hooks);

  hooks.beforeEach(function () {
    setupTestState();
  });

  test('should use sites the user is an admin or moderator of as the model', async function (assert) {
    assert.expect(2);

    // Arrange
    await setupAuthState({
      user: { uid: 'user_a' },
    });

    const route = this.owner.lookup('route:sites');

    // Act
    const result = await route.model();

    // Assert
    assert.equal(result.sitesAsAdmin.length, 2);
    assert.equal(result.sitesAsModerator.length, 1);
  });
});
