import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

import { setupTestState } from '@cenchat/shared/test-support';

module('Integration | Component | site/page/chats/-components/route-view', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function () {
    setupTestState();

    this.set('chats', []);
    this.set('currentUserChat', null);
  });

  test('should show <TopBar />', async function (assert) {
    assert.expect(1);

    // Act
    await render(hbs`{{site/page/chats/-components/route-view chats=this.chats currentUserChat=this.currentUserChat}}`);

    // Assert
    assert.dom('[data-test-top-bar="host"]').exists();
  });

  test('should show <MainContent />', async function (assert) {
    assert.expect(1);

    // Act
    await render(hbs`{{site/page/chats/-components/route-view chats=this.chats currentUserChat=this.currentUserChat}}`);

    // Assert
    assert.dom('[data-test-main-content="host"]').exists();
  });
});
