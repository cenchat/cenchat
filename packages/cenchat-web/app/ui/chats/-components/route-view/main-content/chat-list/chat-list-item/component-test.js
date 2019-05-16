import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

import { setupTestState, timeout } from '@cenchat/shared/test-support';

module('Integration | Component | chats/-components/route-view/main-content/chat-list/chat-list-item', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function () {
    setupTestState();

    const store = this.owner.lookup('service:store');
    const chat = await store.findRecord('chat', 'site_a__page_a__user_b');

    this.set('chat', chat);
  });

  test('should show chat info', async function (assert) {
    assert.expect(3);

    // Act
    await render(hbs`{{chats/-components/route-view/main-content/chat-list/chat-list-item chat=this.chat}}`);

    // Assert
    await timeout(100); // Wait for relationship to load and render
    assert.dom('[data-test-chat-list-item="name"]').hasText('Site A');
    assert.dom('[data-test-chat-list-item="message"]').hasText('user_b: Message B');
    assert.dom('[data-test-chat-list-item="timestamp"]').exists();
  });

  test('should mark chat as unread if true', async function (assert) {
    assert.expect(1);

    // Arrange
    this.set('chat.isUnread', true);

    // Act
    await render(hbs`{{chats/-components/route-view/main-content/chat-list/chat-list-item chat=this.chat}}`);

    // Assert
    assert.dom('[data-test-chat-list-item="host"]').hasClass('chats_route-view-main-content-chat-list-item--unread');
  });

  test('should mark chat as unread if true', async function (assert) {
    assert.expect(1);

    // Arrange
    this.set('chat.isUnread', false);

    // Act
    await render(hbs`{{chats/-components/route-view/main-content/chat-list/chat-list-item chat=this.chat}}`);

    // Assert
    assert.dom('[data-test-chat-list-item="host"]').hasNoClass('chats_route-view-main-content-chat-list-item--unread');
  });
});
