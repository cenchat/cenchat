import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

import { setupTestState } from '@cenchat/shared/test-support';

module('Integration | Component | message-list', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function () {
    setupTestState();

    const store = this.owner.lookup('service:store');
    const chat = await store.findRecord('chat', 'site_a__page_a__user_b');
    const messages = await chat.get('messages');

    this.set('messages', messages);
  });

  test('should render <MessageListItem /> for every message grouping', async function (assert) {
    assert.expect(1);

    // Act
    await render(hbs`<MessageList @messages={{this.messages}} />`);

    // Assert
    assert.dom('[data-test-message-list-item="host"]').exists({ count: 2 });
  });
});
