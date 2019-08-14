import { click, render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

import { setupAuthState, setupTestState, timeout } from '@cenchat/shared/test-support';
import sinon from 'sinon';

module('Integration | Component | chats/chat/-components/route-view/top-bar', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function () {
    setupTestState();

    const store = this.owner.lookup('service:store');
    const chat = await store.findRecord('chat', 'site_a__page_a__user_b');

    this.set('chat', chat);
    this.set('onToggleChatVisibilityClick', () => {});
  });

  test('should show site name when current user is the chat creator', async function (assert) {
    assert.expect(1);

    // Arrange
    await setupAuthState({
      user: { uid: 'user_b' },
    });

    // Act
    await render(hbs`
      {{chats/chat/-components/route-view/top-bar
        chat=this.chat
        onToggleChatVisibilityClick=(fn this.onToggleChatVisibilityClick)
      }}
    `);

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
    await render(hbs`
      {{chats/chat/-components/route-view/top-bar
        chat=this.chat
        onToggleChatVisibilityClick=(fn this.onToggleChatVisibilityClick)
      }}
    `);

    // Assert
    await timeout(100); // Wait for relationships to load
    assert.dom('[data-test-top-bar="heading"]').hasText('user_b');
  });

  test('should show turn on visibility button when chat is not public', async function (assert) {
    assert.expect(1);

    // Arrange
    await setupAuthState({
      user: { uid: 'user_b' },
    });

    this.set('chat.isPublic', false);

    // Act
    await render(hbs`
      {{chats/chat/-components/route-view/top-bar
        chat=this.chat
        onToggleChatVisibilityClick=(fn this.onToggleChatVisibilityClick)
      }}
    `);

    // Assert
    assert.dom('[data-test-top-bar="turn-on-visibility-button"]').exists();
  });

  test('should hide turn on visibility button when chat is public', async function (assert) {
    assert.expect(1);

    // Arrange
    await setupAuthState({
      user: { uid: 'user_b' },
    });

    // Act
    await render(hbs`
      {{chats/chat/-components/route-view/top-bar
        chat=this.chat
        onToggleChatVisibilityClick=(fn this.onToggleChatVisibilityClick)
      }}
    `);

    // Assert
    assert.dom('[data-test-top-bar="turn-on-visibility-button"]').doesNotExist();
  });

  test('should show turn off visibility button when chat is public', async function (assert) {
    assert.expect(1);

    // Arrange
    await setupAuthState({
      user: { uid: 'user_b' },
    });

    // Act
    await render(hbs`
      {{chats/chat/-components/route-view/top-bar
        chat=this.chat
        onToggleChatVisibilityClick=(fn this.onToggleChatVisibilityClick)
      }}
    `);

    // Assert
    assert.dom('[data-test-top-bar="turn-off-visibility-button"]').exists();
  });

  test('should hide turn off visibility button when chat is not public', async function (assert) {
    assert.expect(1);

    // Arrange
    await setupAuthState({
      user: { uid: 'user_b' },
    });

    this.set('chat.isPublic', false);

    // Act
    await render(hbs`
      {{chats/chat/-components/route-view/top-bar
        chat=this.chat
        onToggleChatVisibilityClick=(fn this.onToggleChatVisibilityClick)
      }}
    `);

    // Assert
    assert.dom('[data-test-top-bar="turn-off-visibility-button"]').doesNotExist();
  });

  test('should fire an external action when clicking turn on visibility', async function (assert) {
    assert.expect(1);

    // Arrange
    await setupAuthState({
      user: { uid: 'user_b' },
    });

    this.set('chat.isPublic', false);

    const spy = sinon.spy(this, 'onToggleChatVisibilityClick');

    // Act
    await render(hbs`
      {{chats/chat/-components/route-view/top-bar
        chat=this.chat
        onToggleChatVisibilityClick=(fn this.onToggleChatVisibilityClick)
      }}
    `);
    await click('[data-test-top-bar="turn-on-visibility-button"]');

    // Assert
    assert.ok(spy.calledWith(true));
  });

  test('should fire an external action when clicking turn off visibility', async function (assert) {
    assert.expect(1);

    // Arrange
    await setupAuthState({
      user: { uid: 'user_b' },
    });

    const spy = sinon.spy(this, 'onToggleChatVisibilityClick');

    // Act
    await render(hbs`
      {{chats/chat/-components/route-view/top-bar
        chat=this.chat
        onToggleChatVisibilityClick=(fn this.onToggleChatVisibilityClick)
      }}
    `);
    await click('[data-test-top-bar="turn-off-visibility-button"]');

    // Assert
    assert.ok(spy.calledWith(false));
  });
});
