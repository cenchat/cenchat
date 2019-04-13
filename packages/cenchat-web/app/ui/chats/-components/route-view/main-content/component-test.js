import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

import { setupTestState } from '@cenchat/shared/test-support';
import sinon from 'sinon';

module('Integration | Component | chats/-components/route-view/main-content', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function () {
    setupTestState();

    const router = this.owner.lookup('service:router');

    sinon.stub(router, 'urlFor');

    const store = this.owner.lookup('service:store');
    const user = await store.findRecord('user', 'user_a');
    const chats = await user.get('latestActiveChats');

    this.set('chats', chats);
  });

  test('should show <ChatList /> when there are chats', async function (assert) {
    assert.expect(1);

    // Act
    await render(hbs`{{chats/-components/route-view/main-content chats=this.chats}}`);

    // Assert
    assert.dom('[data-test-chat-list="host"]').exists();
  });

  test('should hide <ChatList /> when there are no chats', async function (assert) {
    assert.expect(1);

    // Arrange
    this.set('chats', []);

    // Act
    await render(hbs`{{chats/-components/route-view/main-content chats=this.chats}}`);

    // Assert
    assert.dom('[data-test-chat-list="host"]').doesNotExist();
  });

  test('should show empty state message when there are no chats', async function (assert) {
    assert.expect(1);

    // Arrange
    this.set('chats', []);

    // Act
    await render(hbs`{{chats/-components/route-view/main-content chats=this.chats}}`);

    // Assert
    assert.dom('[data-test-main-content="empty-state-message"]').exists();
  });

  test('should hide empty state message when there are chats', async function (assert) {
    assert.expect(1);

    // Act
    await render(hbs`{{chats/-components/route-view/main-content chats=this.chats}}`);

    // Assert
    assert.dom('[data-test-main-content="empty-state-message"]').doesNotExist();
  });
});
