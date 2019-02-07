import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

import sinon from 'sinon';

module('Integration | Component | site/page/chats/-components/route-view/top-bar', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    const router = this.owner.lookup('service:router');

    sinon.stub(router, 'urlFor');

    this.set('currentUserChat', null);
  });

  test('should render', async function (assert) {
    assert.expect(1);

    // Act
    await render(hbs`{{site/page/chats/-components/route-view/top-bar currentUserChat=this.currentUserChat}}`);

    // Assert
    assert.dom('[data-test-top-bar="host"]').exists();
  });
});
