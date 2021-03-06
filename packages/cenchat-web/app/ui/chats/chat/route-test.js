import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

import { setupTestState } from '@cenchat/shared/test-support';

module('Unit | Route | chats', function (hooks) {
  setupTest(hooks);

  hooks.beforeEach(function () {
    setupTestState();
  });

  test('should use chat as the model', async function (assert) {
    assert.expect(1);

    // Arrange
    const route = this.owner.lookup('route:chats/chat');

    // Act
    const result = await route.model({ chat_id: 'site_a__page_a__user_b' });

    // Assert
    assert.equal(result.get('id'), 'site_a__page_a__user_b');
  });
});
