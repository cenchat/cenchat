import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import { visit } from '@ember/test-helpers';

import { authenticateSession } from 'ember-simple-auth/test-support';
import { setupApplicationTestState } from '@cenchat/shared/test-support';

module('Acceptance | chats', function (hooks) {
  setupApplicationTest(hooks);

  hooks.beforeEach(function () {
    setupApplicationTestState();
  });

  test('should list the chats', async function (assert) {
    assert.expect(1);

    // Arrange
    await authenticateSession({
      user: { uid: 'user_a' },
    });

    // Act
    await visit('/chats');

    // Assert
    assert.dom('[data-test-chat-list-item="host"]').exists({ count: 2 });
  });
});
