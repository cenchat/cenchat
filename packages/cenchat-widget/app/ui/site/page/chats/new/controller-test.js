import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

import { setupAuthState, setupTestState } from '@cenchat/shared/test-support';
import sinon from 'sinon';

module('Unit | Controller | site/page/chats/new', function (hooks) {
  setupTest(hooks);

  hooks.beforeEach(function () {
    setupTestState();
  });

  test('should create chat record when sending a message', async function (assert) {
    assert.expect(2);

    // Arrange
    await setupAuthState({
      user: { uid: 'user_a', isAnonymous: true },
    });
    const controller = this.owner.lookup('controller:site/page/chats/new');
    const store = this.owner.lookup('service:store');

    controller.set('model', {
      isPublic: false,
      page: await store.findRecord('page', 'site_a__page_a'),
      site: await store.findRecord('site', 'site_a'),
    });

    sinon.stub(controller, 'transitionToRoute');

    // Act
    await controller.handleSendMessageClick('Foo');

    // Assert
    const db = this.owner.lookup('service:firebase').firestore();
    const chatQuerySnapshot = await db.collection('chats').get();

    assert.equal(chatQuerySnapshot.size, 3);

    const messageQuerySnapshot = await db.collection('messages').get();

    assert.equal(messageQuerySnapshot.size, 4);
  });

  test('should transition to site.page.chats.chat after sending a message', async function (assert) {
    assert.expect(1);

    // Arrange
    await setupAuthState({
      user: { uid: 'user_a', isAnonymous: true },
    });
    const controller = this.owner.lookup('controller:site/page/chats/new');
    const store = this.owner.lookup('service:store');

    controller.set('model', {
      isPublic: false,
      page: await store.findRecord('page', 'site_a__page_a'),
      site: await store.findRecord('site', 'site_a'),
    });

    const transitionToStub = sinon.stub(controller, 'transitionToRoute');

    // Act
    await controller.handleSendMessageClick('Foo');

    // Assert
    assert.ok(transitionToStub.calledWithExactly('site.page.chats.chat', 'site_a__page_a__user_a'));
  });
});
