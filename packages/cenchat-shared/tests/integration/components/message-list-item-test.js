import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

import { setupTestState } from '@cenchat/shared/test-support';

module('Integration | Component | message-list-item', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function () {
    setupTestState();

    const store = this.owner.lookup('service:store');
    const messageA = await store.findRecord('message', 'message_a');
    const messageB = await store.findRecord('message', 'message_a');

    this.set('messageGroup', {
      author: messageA.get('author'),
      timestamp: messageA.get('createdOn'),
      messages: [messageA, messageB],
    });
  });

  test('should show message info', async function (assert) {
    assert.expect(3);

    // Act
    await render(hbs`<MessageListItem @messageGroup={{this.messageGroup}} />`);

    // Assert
    assert.dom('[data-test-message-list-item="author-name"]').hasText('User B');
    assert.dom('[data-test-message-list-item="timestamp"]').exists();
    assert.dom('[data-test-message-list-item="content"]').exists({ count: 2 });
  });
});
