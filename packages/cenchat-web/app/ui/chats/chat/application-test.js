import { click, fillIn, visit } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';

import { authenticateSession } from 'ember-simple-auth/test-support';
import { setupApplicationTestState } from '@cenchat/shared/test-support';

module('Acceptance | chats/chat', function (hooks) {
  setupApplicationTest(hooks);

  hooks.beforeEach(function () {
    setupApplicationTestState();
  });

  test('should make a chat visible to everyone', async function (assert) {
    assert.expect(1);

    // Arrange
    await authenticateSession({
      user: { uid: 'user_a' },
    });
    await visit('/chats/site_a__page_a__user_c/');

    // Act
    await click('[data-test-top-bar="turn-on-visibility-button"]');

    // Assert
    assert.dom('[data-test-application="toast"]').hasText('Chat is now visible to everyone');
  });

  test('should make a chat not visible to everyone', async function (assert) {
    assert.expect(1);

    // Arrange
    await authenticateSession({
      user: { uid: 'user_a' },
    });
    await visit('/chats/site_a__page_a__user_b/');

    // Act
    await click('[data-test-top-bar="turn-off-visibility-button"]');

    // Assert
    assert.dom('[data-test-application="toast"]').hasText('Chat is now visible only to the creator and the site members');
  });

  test('should create a message record when sending a message', async function (assert) {
    assert.expect(1);

    // Arrange
    await authenticateSession({
      user: { uid: 'user_a' },
    });
    await visit('/chats/site_a__page_a__user_b/');

    // Act
    await fillIn('[data-test-chat-composer="message-field"]', 'Foo');
    await click('[data-test-chat-composer="send-message-button"]');

    // Assert
    const db = this.owner.lookup('service:firebase').firestore();
    const chatDocRef = db.doc('chats/site_a__page_a__user_b');
    const querySnapshot = await db.collection('messages').where('chat', '==', chatDocRef).get();

    assert.equal(querySnapshot.size, 3);
  });
});
