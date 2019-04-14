import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

import { setupAuthState, setupTestState } from '@cenchat/shared/test-support';

module('Integration | Component | site/page/chats/chat/-components/route-view', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function () {
    setupTestState();

    const store = this.owner.lookup('service:store');
    const chat = await store.findRecord('chat', 'site_a__page_a__user_b');

    this.set('chat', chat);
    this.set('onSendMessageEvent', () => {});
  });

  test('should show anonymous hint when creator of chat and creator account is anonymous type', async function (assert) {
    assert.expect(1);

    // Arrange
    await setupAuthState({
      user: { uid: 'user_b', isAnonymous: true },
    });

    // Act
    await render(hbs`{{site/page/chats/chat/-components/route-view chat=this.chat onSendMessageEvent=(action this.onSendMessageEvent)}}`);

    // Assert
    assert.dom('[data-test-route-view="anonymous-banner"]').exists();
  });

  test('should hide anonymous hint when not creator of chat', async function (assert) {
    assert.expect(1);

    // Arrange
    await setupAuthState({
      user: { uid: 'user_a', isAnonymous: true },
    });

    // Act
    await render(hbs`{{site/page/chats/chat/-components/route-view chat=this.chat onSendMessageEvent=(action this.onSendMessageEvent)}}`);

    // Assert
    assert.dom('[data-test-route-view="anonymous-banner"]').doesNotExist();
  });

  test('should hide anonymous hint when creator of chat and creator account is not anonymous type', async function (assert) {
    assert.expect(1);

    // Arrange
    await setupAuthState({
      user: { uid: 'user_b', isAnonymous: false },
    });

    // Act
    await render(hbs`{{site/page/chats/chat/-components/route-view chat=this.chat onSendMessageEvent=(action this.onSendMessageEvent)}}`);

    // Assert
    assert.dom('[data-test-route-view="anonymous-banner"]').doesNotExist();
  });

  test('should show <MainContent />', async function (assert) {
    assert.expect(1);

    // Arrange
    await setupAuthState({
      user: { uid: 'user_a', isAnonymous: false },
    });

    // Act
    await render(hbs`{{site/page/chats/chat/-components/route-view chat=this.chat onSendMessageEvent=(action this.onSendMessageEvent)}}`);

    // Assert
    assert.dom('[data-test-main-content="host"]').exists();
  });

  test('should show <ChatComposer /> when creator of chat', async function (assert) {
    assert.expect(1);

    // Arrange
    await setupAuthState({
      user: { uid: 'user_b', isAnonymous: false },
    });

    // Act
    await render(hbs`{{site/page/chats/chat/-components/route-view chat=this.chat onSendMessageEvent=(action this.onSendMessageEvent)}}`);

    // Assert
    assert.dom('[data-test-chat-composer="host"]').exists();
  });

  test('should show <ChatComposer /> when admin of site the chat belongs to', async function (assert) {
    assert.expect(1);

    // Arrange
    await setupAuthState({
      user: { uid: 'user_a', isAnonymous: false },
    });

    // Act
    await render(hbs`{{site/page/chats/chat/-components/route-view chat=this.chat onSendMessageEvent=(action this.onSendMessageEvent)}}`);

    // Assert
    assert.dom('[data-test-chat-composer="host"]').exists();
  });

  test('should hide <ChatComposer /> when not the creator of the chat and not an admin of site the chat belongs to', async function (assert) {
    assert.expect(1);

    // Arrange
    await setupAuthState({
      user: { uid: 'user_c', isAnonymous: false },
    });

    // Act
    await render(hbs`{{site/page/chats/chat/-components/route-view chat=this.chat onSendMessageEvent=(action this.onSendMessageEvent)}}`);

    // Assert
    assert.dom('[data-test-chat-composer="host"]').doesNotExist();
  });

  test('should show composer disabled message when not the creator of the chat and not an admin of site the chat belongs to', async function (assert) {
    assert.expect(1);

    // Arrange
    await setupAuthState({
      user: { uid: 'user_c', isAnonymous: false },
    });

    // Act
    await render(hbs`{{site/page/chats/chat/-components/route-view chat=this.chat onSendMessageEvent=(action this.onSendMessageEvent)}}`);

    // Assert
    assert.dom('[data-test-route-view="composer-disabled"]').exists();
  });

  test('should hide composer disabled message when the creator of the chat', async function (assert) {
    assert.expect(1);

    // Arrange
    await setupAuthState({
      user: { uid: 'user_b', isAnonymous: false },
    });

    // Act
    await render(hbs`{{site/page/chats/chat/-components/route-view chat=this.chat onSendMessageEvent=(action this.onSendMessageEvent)}}`);

    // Assert
    assert.dom('[data-test-route-view="composer-disabled"]').doesNotExist();
  });

  test('should hide composer disabled message when an admin of site the chat belongs to', async function (assert) {
    assert.expect(1);

    // Arrange
    await setupAuthState({
      user: { uid: 'user_a', isAnonymous: false },
    });

    // Act
    await render(hbs`{{site/page/chats/chat/-components/route-view chat=this.chat onSendMessageEvent=(action this.onSendMessageEvent)}}`);

    // Assert
    assert.dom('[data-test-route-view="composer-disabled"]').doesNotExist();
  });
});
