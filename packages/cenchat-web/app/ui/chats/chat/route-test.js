import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

import { setupAuthState, setupTestState } from '@cenchat/shared/test-support';

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

  test('should remove unread state of the chat model', async function (assert) {
    assert.expect(1);

    // Arrange
    await setupAuthState({
      user: { uid: 'user_a' },
    });

    const store = this.owner.lookup('service:store');
    const chat = await store.findRecord('chat', 'site_a__page_a__user_b');

    chat.set('isUnread', true);

    const route = this.owner.lookup('route:chats/chat');

    // Act
    await route.afterModel(chat);

    // Assert
    const db = this.owner.lookup('service:firebase').firestore();
    const unreadChatDocSnapshot = await db
      .collection('users')
      .doc('user_a')
      .collection('unreadChats')
      .doc('site_a__page_a__user_b')
      .get();

    assert.equal(unreadChatDocSnapshot.exists, false);
  });
});
