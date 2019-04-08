import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

import sinon from 'sinon';

module('Integration | Component | site/page/chats/-components/route-view', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function () {
    const router = this.owner.lookup('service:router');

    sinon.stub(router, 'urlFor');

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
