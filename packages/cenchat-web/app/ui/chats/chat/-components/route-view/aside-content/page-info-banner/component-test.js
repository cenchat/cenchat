import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

import { setupTestState } from '@cenchat/shared/test-support';

module('Integration | Component | chats/chat/-components/route-view/aside-content/page-info-banner', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function () {
    setupTestState();

    const store = this.owner.lookup('service:store');
    const chat = await store.findRecord('chat', 'site_a__page_a__user_b');

    await chat.get('site'); // Preload site
    await chat.get('page'); // Preload page

    this.set('chat', chat);
  });

  test('should show page title when available', async function (assert) {
    assert.expect(1);

    // Act
    await render(hbs`{{chats/chat/-components/route-view/aside-content/page-info-banner chat=this.chat}}`);

    // Assert
    assert.dom('[data-test-page-info-banner="title"]').hasText('Page A Title');
  });

  test('should show page url when title is unavailable', async function (assert) {
    assert.expect(1);

    // Arrange
    this.set('chat.page.title', null);

    // Act
    await render(hbs`{{chats/chat/-components/route-view/aside-content/page-info-banner chat=this.chat}}`);

    // Assert
    assert.dom('[data-test-page-info-banner="title"]').hasText('http://site-a.com/foo/bar');
  });
});
