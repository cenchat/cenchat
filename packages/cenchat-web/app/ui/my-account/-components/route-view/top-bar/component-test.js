import { click, render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

import sinon from 'sinon';

module('Integration | Component | my-account/-components/route-view/top-bar', function (hooks) {
  setupRenderingTest(hooks);

  test('should fire an external action when clicking sign out', async function (assert) {
    assert.expect(1);

    // Arrange
    const stub = sinon.stub();

    this.set('onSignOutClick', stub);

    // Act
    await render(hbs`{{my-account/-components/route-view/top-bar onSignOutClick=(fn this.onSignOutClick)}}`);
    await click('[data-test-top-bar="sign-out-button"]');

    // Assert
    assert.ok(stub.calledOnce);
  });
});
