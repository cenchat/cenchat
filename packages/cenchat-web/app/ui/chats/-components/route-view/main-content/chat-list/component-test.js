import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

import { setupTestState, timeout } from '@cenchat/shared/test-support';

module('Integration | Component | chats/-components/route-view/main-content/chat-list', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function () {
    setupTestState();

    const store = this.owner.lookup('service:store');
    const user = await store.findRecord('user', 'user_a');
    const chats = await user.get('latestActiveChats');

    this.set('chats', chats);
  });

  test('should show <ChatListItem /> per every chat sorted by descending last activity timestamp', async function (assert) {
    assert.expect(3);

    // Act
    await render(hbs`{{chats/-components/route-view/main-content/chat-list chats=this.chats}}`);

    // Assert
    await timeout(100); // Wait for relationship to load and render
    assert.dom('[data-test-chat-list-item="host"]').exists({ count: 2 });

    const elements = this.element.querySelectorAll('[data-test-chat-list-item="message"]');

    assert.dom(elements[0]).hasText('user_c: Message C');
    assert.dom(elements[1]).hasText('user_b: Message B');
  });
});
