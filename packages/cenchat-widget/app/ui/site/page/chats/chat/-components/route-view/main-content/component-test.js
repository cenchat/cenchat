import { module, test } from 'qunit';
import { render } from '@ember/test-helpers';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

import { setupTestState } from '@cenchat/shared/test-support';

module('Integration | Component | site/page/chats/chat/-components/route-view/main-content', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function () {
    setupTestState();

    const store = this.owner.lookup('service:store');
    const chat = await store.findRecord('chat', 'site_a__page_a__user_b');

    await chat.get('messages'); // Preload
    await chat.get('descendingMessages'); // Preload

    this.set('chat', chat);
    this.set('permissionState', 'reader');
  });

  test('should show <MessageList />', async function (assert) {
    assert.expect(1);

    // Act
    await render(hbs`{{site/page/chats/chat/-components/route-view/main-content chat=this.chat permissionState=this.permissionState}}`);

    // Assert
    assert.dom('[data-test-message-list="host"]').exists();
  });
});
