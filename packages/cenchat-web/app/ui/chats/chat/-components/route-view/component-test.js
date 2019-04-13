import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

import { setupTestState } from '@cenchat/shared/test-support';
import sinon from 'sinon';

module('Integration | Component | chats/chat/-components/route-view', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function () {
    setupTestState();

    const router = this.owner.lookup('service:router');

    sinon.stub(router, 'urlFor');

    const store = this.owner.lookup('service:store');
    const chat = await store.findRecord('chat', 'site_a__page_a__user_b');

    this.set('chat', chat);
    this.set('onSendMessageEvent', () => {});
  });

  test('should show <MainContent />', async function (assert) {
    assert.expect(1);

    // Act
    await render(hbs`{{chats/chat/-components/route-view chat=this.chat onSendMessageEvent=(action this.onSendMessageEvent)}}`);

    // Assert
    assert.dom('[data-test-main-content="host"]').exists();
  });

  test('should show <ChatComposer />', async function (assert) {
    assert.expect(1);

    // Act
    await render(hbs`{{chats/chat/-components/route-view chat=this.chat onSendMessageEvent=(action this.onSendMessageEvent)}}`);

    // Assert
    assert.dom('[data-test-chat-composer="host"]').exists();
  });
});
