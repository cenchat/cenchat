import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

import { setupTestState } from '@cenchat/shared/test-support';

module('Integration | Component | site/page/chats/-components/route-view/main-content', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function () {
    setupTestState();

    const store = this.owner.lookup('service:store');
    const page = await store.findRecord('page', 'site_a__page_a');

    this.set('chats', await page.get('publicChats'));
  });

  test('should show <ChatCollection /> when chats is available', async function (assert) {
    assert.expect(1);

    // Act
    await render(hbs`{{site/page/chats/-components/route-view/main-content chats=this.chats}}`);

    // Assert
    assert.dom('[data-test-chat-collection="host"]').exists();
  });

  test('should hide <ChatCollection /> when chats is unavailable', async function (assert) {
    assert.expect(1);

    // Arrange
    this.set('chats', []);

    // Act
    await render(hbs`{{site/page/chats/-components/route-view/main-content chats=this.chats}}`);

    // Assert
    assert.dom('[data-test-chat-collection="host"]').doesNotExist();
  });

  test('should show empty state when chats is unavailable', async function (assert) {
    assert.expect(1);

    // Arrange
    this.set('chats', []);

    // Act
    await render(hbs`{{site/page/chats/-components/route-view/main-content chats=this.chats}}`);

    // Assert
    assert.dom('[data-test-main-content="empty-state"]').exists();
  });

  test('should hide empty state when chats is available', async function (assert) {
    assert.expect(1);

    // Act
    await render(hbs`{{site/page/chats/-components/route-view/main-content chats=this.chats}}`);

    // Assert
    assert.dom('[data-test-main-content="empty-state"]').doesNotExist();
  });
});
