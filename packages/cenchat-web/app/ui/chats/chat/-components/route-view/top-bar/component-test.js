import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

import { setupAuthState, setupTestState, timeout } from '@cenchat/shared/test-support';

module('Integration | Component | chats/chat/-components/route-view/top-bar', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function () {
    setupTestState();

    const store = this.owner.lookup('service:store');
    const chat = await store.findRecord('chat', 'site_a__page_a__user_b');

    this.set('chat', chat);
  });

  test('should show site name when current user is the chat creator', async function (assert) {
    assert.expect(1);

    // Arrange
    await setupAuthState({
      user: { uid: 'user_b' },
    });

    // Act
    await render(hbs`{{chats/chat/-components/route-view/top-bar chat=this.chat}}`);

    // Assert
    await timeout(100); // Wait for relationships to load
    assert.dom('[data-test-top-bar="heading"]').hasText('Site A');
  });

  test('should show author name when current user is a site admin', async function (assert) {
    assert.expect(1);

    // Arrange
    await setupAuthState({
      user: { uid: 'user_a' },
    });

    // Act
    await render(hbs`{{chats/chat/-components/route-view/top-bar chat=this.chat}}`);

    // Assert
    await timeout(100); // Wait for relationships to load
    assert.dom('[data-test-top-bar="heading"]').hasText('@user_b');
  });
});
