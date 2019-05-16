import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

import { setupAuthState, setupTestState } from '@cenchat/shared/test-support';

module('Unit | Route | chats', function (hooks) {
  setupTest(hooks);

  hooks.beforeEach(function () {
    setupTestState();
  });

  test('should use the latest active chats as the model', async function (assert) {
    assert.expect(1);

    // Arrange
    await setupAuthState({
      user: { uid: 'user_a' },
    });

    const route = this.owner.lookup('route:chats');

    // Act
    const result = await route.model();

    // Assert
    assert.equal(result.get('length'), 2);
  });

  test('should check and set if every chat in the model is unread', async function (assert) {
    assert.expect(2);

    // Arrange
    await setupAuthState({
      user: { uid: 'user_a' },
    });

    const store = this.owner.lookup('service:store');
    const user = await store.findRecord('user', 'user_a');
    const chats = await user.get('latestActiveChats');
    const route = this.owner.lookup('route:chats');

    // Act
    await route.afterModel(chats);

    // Assert
    assert.equal(chats.get('firstObject.isUnread'), false);
    assert.equal(chats.get('lastObject.isUnread'), true);
  });
});
