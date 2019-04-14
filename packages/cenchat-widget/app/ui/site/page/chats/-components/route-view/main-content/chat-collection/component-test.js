import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

import { setupTestState } from '@cenchat/shared/test-support';

module('Integration | Component | site/page/chats/-components/route-view/main-content/chat-collection', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function () {
    setupTestState();

    const page = await this.owner.lookup('service:store').findRecord('page', 'site_a__page_a');
    const publicChats = await page.get('publicChats');

    this.set('chats', publicChats);
  });

  test('should display a collection of chats', async function (assert) {
    assert.expect(1);

    // Act
    await render(hbs`{{site/page/chats/-components/route-view/main-content/chat-collection chats=this.chats}}`);

    // Assert
    assert.dom('[data-test-chat-collection="host"]').exists({ count: 1 });
  });
});
