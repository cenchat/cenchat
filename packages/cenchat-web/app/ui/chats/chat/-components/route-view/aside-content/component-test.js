import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

import { setupTestState } from '@cenchat/shared/test-support';

module('Integration | Component | chats/chat/-components/route-view/aside-content', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function () {
    setupTestState();

    const store = this.owner.lookup('service:store');
    const chat = await store.findRecord('chat', 'site_a__page_a__user_b');

    this.set('chat', chat);
  });

  test('should show <PageInfoBanner />', async function (assert) {
    assert.expect(1);

    // Act
    await render(hbs`{{chats/chat/-components/route-view/aside-content chat=this.chat}}`);

    // Assert
    assert.dom('[data-test-page-info-banner="host"]').exists();
  });
});
