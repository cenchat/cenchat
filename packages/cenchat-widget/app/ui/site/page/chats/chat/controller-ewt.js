import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

import { setupAuthState, setupTestState } from '@cenchat/shared/test-support';

module('Unit | Controller | site/page/chats/chat', function (hooks) {
  setupTest(hooks);

  hooks.beforeEach(function () {
    setupTestState();
  });

  test('should create message record when sending a message', async function (assert) {
    assert.expect(1);

    // Arrange
    await setupAuthState({
      user: { uid: 'user_a', isAnonymous: true },
    });
    const controller = this.owner.lookup('controller:site/page/chats/chat');
    const store = this.owner.lookup('service:store');

    controller.set('model', await store.findRecord('chat', 'site_a__page_a__user_b'));

    // Act
    await controller.handleSendMessageEvent('Foo');

    // Assert
    const db = this.owner.lookup('service:firebase').firestore();
    const chatDocRef = db.doc('chats/site_a__page_a__user_b');
    const querySnapshot = await db.collection('messages').where('chat', '==', chatDocRef).get();

    assert.equal(querySnapshot.size, 3);
  });
});
