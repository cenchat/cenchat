import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

import { setupTestState, timeout } from '@cenchat/shared/test-support';
import sinon from 'sinon';

module('Integration | Component | chats/-components/route-view/main-content/chat-list/chat-list-item', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function () {
    setupTestState();

    const router = this.owner.lookup('service:router');

    sinon.stub(router, 'urlFor');

    const store = this.owner.lookup('service:store');
    const chat = await store.findRecord('chat', 'site_a__page_a__user_b');

    this.set('chat', chat);
  });

  test('should show chat info', async function (assert) {
    assert.expect(3);

    // Act
    await render(hbs`{{chats/-components/route-view/main-content/chat-list/chat-list-item chat=this.chat}}`);

    // Assert
    await timeout(1000); // Wait for relationship to load and render
    assert.dom('[data-test-chat-list-item="name"]').hasText('Site A');
    assert.dom('[data-test-chat-list-item="message"]').hasText('User B: Message B');
    assert.dom('[data-test-chat-list-item="timestamp"]').exists();
  });
});
