import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

import { setupTestState, timeout } from '@cenchat/shared/test-support';

module('Integration | Component | chats/chat/-components/route-view/aside-content/page-info-banner', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function () {
    setupTestState();

    const store = this.owner.lookup('service:store');
    const chat = await store.findRecord('chat', 'site_a__page_a__user_b');

    this.set('chat', chat);
  });

  test('should show page title', async function (assert) {
    assert.expect(1);

    // Act
    await render(hbs`{{chats/chat/-components/route-view/aside-content/page-info-banner chat=this.chat}}`);

    // Assert
    await timeout(100); // Wait for relationships to load
    assert.dom('[data-test-page-info-banner="title"]').hasText('Page A Title');
  });
});
