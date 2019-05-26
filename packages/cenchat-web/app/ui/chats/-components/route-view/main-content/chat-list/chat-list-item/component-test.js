import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

import { setupAuthState, setupTestState, timeout } from '@cenchat/shared/test-support';

module('Integration | Component | chats/-components/route-view/main-content/chat-list/chat-list-item', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function () {
    setupTestState();

    const store = this.owner.lookup('service:store');
    const chat = await store.findRecord('chat', 'site_a__page_a__user_b');

    this.set('chat', chat);
  });

  test('should show chat info for site member', async function (assert) {
    assert.expect(4);

    // Arrange
    await setupAuthState({
      user: { uid: 'user_a' },
    });

    // Act
    await render(hbs`{{chats/-components/route-view/main-content/chat-list/chat-list-item chat=this.chat}}`);

    // Assert
    await timeout(100); // Wait for relationship to load and render
    assert.dom('[data-test-chat-list-item="creator-username-for-site-member"]').hasText('user_b');
    assert.dom('[data-test-chat-list-item="page-info-for-site-member"]').hasText('Site A - Page A Title');
    assert.dom('[data-test-chat-list-item="message"]').hasText('user_b: Message B');
    assert.dom('[data-test-chat-list-item="timestamp"]').exists();
  });

  test('should show chat info for chat creator', async function (assert) {
    assert.expect(4);

    // Arrange
    await setupAuthState({
      user: { uid: 'user_b' },
    });

    // Act
    await render(hbs`{{chats/-components/route-view/main-content/chat-list/chat-list-item chat=this.chat}}`);

    // Assert
    await timeout(100); // Wait for relationship to load and render
    assert.dom('[data-test-chat-list-item="site-name-for-creator"]').hasText('Site A');
    assert.dom('[data-test-chat-list-item="page-title-for-creator"]').hasText('Page A Title');
    assert.dom('[data-test-chat-list-item="message"]').hasText('user_b: Message B');
    assert.dom('[data-test-chat-list-item="timestamp"]').exists();
  });

  test('should check and mark chat as unread if true', async function (assert) {
    assert.expect(1);

    // Arrange
    await setupAuthState({
      user: { uid: 'user_a' },
    });

    // Act
    await render(hbs`{{chats/-components/route-view/main-content/chat-list/chat-list-item chat=this.chat}}`);

    // Assert
    assert.dom('[data-test-chat-list-item="host"]').hasClass('chats_route-view-main-content-chat-list-item--unread');
  });

  test('should check and not mark chat as unread if false', async function (assert) {
    assert.expect(1);

    // Arrange
    await setupAuthState({
      user: { uid: 'user_a' },
    });

    const store = this.owner.lookup('service:store');
    const chat = await store.findRecord('chat', 'site_a__page_a__user_c');

    this.set('chat', chat);

    // Act
    await render(hbs`{{chats/-components/route-view/main-content/chat-list/chat-list-item chat=this.chat}}`);

    // Assert
    assert.dom('[data-test-chat-list-item="host"]').hasNoClass('chats_route-view-main-content-chat-list-item--unread');
  });
});
