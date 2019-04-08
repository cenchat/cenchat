import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | site/page/chats/-components/route-view/main-content', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    this.set('chats', []);
  });

  test('should render <ChatCollection />', async function (assert) {
    await render(hbs`{{site/page/chats/-components/route-view/main-content chats=this.chats}}`);

    assert.dom('[data-test-chat-collection="host"]').exists();
  });
});
