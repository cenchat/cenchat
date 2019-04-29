import { A } from '@ember/array';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

import { setupTestState, timeout } from '@cenchat/shared/test-support';

module('Integration | Component | message-list-item', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function () {
    setupTestState();

    const store = this.owner.lookup('service:store');
    const messageA = await store.findRecord('message', 'message_a');
    const messageB = await store.findRecord('message', 'message_b');

    this.set('messageGroup', {
      author: messageA.get('author'),
      timestamp: messageA.get('createdOn'),
      messages: new A([messageA, messageB]),
    });
  });

  test('should show message info', async function (assert) {
    assert.expect(3);

    // Act
    await render(hbs`<MessageListItem @messageGroup={{this.messageGroup}} />`);

    // Assert
    assert.dom('[data-test-message-list-item="author-name"]').hasText('@user_b');
    assert.dom('[data-test-message-list-item="timestamp"]').exists();
    assert.dom('[data-test-message-list-item="content"]').exists({ count: 2 });
  });

  test('should mark author name as badged when author is also the chat creator', async function (assert) {
    assert.expect(1);

    // Act
    await render(hbs`<MessageListItem @messageGroup={{this.messageGroup}} />`);

    // Assert
    await timeout(100); // Wait for relationships to load
    assert.dom('[data-test-message-list-item="author-name"]').hasClass('message-list-item__author-name--badged');
  });

  test('should not mark author name as badged when author is not the chat creator', async function (assert) {
    assert.expect(1);

    // Arrange
    const store = this.owner.lookup('service:store');
    const author = await store.findRecord('user', 'user_a');

    this.set('messageGroup.author', author);

    // Act
    await render(hbs`<MessageListItem @messageGroup={{this.messageGroup}} />`);

    // Assert
    await timeout(100); // Wait for relationships to load
    assert.dom('[data-test-message-list-item="author-name"]').doesNotHaveClass('message-list-item__author-name--badged');
  });
});
