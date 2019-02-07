import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

import sinon from 'sinon';

module('Integration | Component | site/page/my-account/-components/route-view', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    const router = this.owner.lookup('service:router');

    sinon.stub(router, 'urlFor');
  });

  test('should show <MainContent />', async function (assert) {
    assert.expect(1);

    // Act
    await render(hbs`{{site/page/my-account/-components/route-view}}`);

    // Assert
    assert.dom('[data-test-main-content="host"]').exists();
  });
});
