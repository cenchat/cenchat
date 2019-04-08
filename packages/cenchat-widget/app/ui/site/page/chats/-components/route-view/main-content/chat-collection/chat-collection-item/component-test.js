import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

import { setupTestState } from '@cenchat/shared/test-support';
import sinon from 'sinon';

module('Integration | Component | site/page/chats/-components/route-view/main-content/chat-collection/chat-collection-item', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function () {
    setupTestState();

    const router = this.owner.lookup('service:router');

    sinon.stub(router, 'urlFor');

    const store = this.owner.lookup('service:store');
    const chat = await store.findRecord('chat', 'site_a__page_a__user_b');

    this.set('chat', chat);
  });

  test('should show <MessageList />', async function (assert) {
    assert.expect(1);

    // Arrange
    await this.chat.get('first3Messages');

    // Act
    await render(hbs`{{site/page/chats/-components/route-view/main-content/chat-collection/chat-collection-item chat=this.chat}}`);

    // Assert
    assert.dom('[data-test-message-list="host"]').exists();
  });
});
