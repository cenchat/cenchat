import { click, render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

import { setupTestState } from '@cenchat/shared/test-support';
import sinon from 'sinon';

module('Integration | Component | top-bar', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    setupTestState();

    this.set('onSaveInfoClick', () => {});
  });

  test('should fire an external action when clicking save', async function (assert) {
    assert.expect(1);

    // Arrange
    const spy = sinon.spy(this, 'onSaveInfoClick');

    // Act
    await render(hbs`{{my-account/update-info/-components/route-view/top-bar onSaveInfoClick=(action this.onSaveInfoClick)}}`);
    await click('[data-test-top-bar="save-button"]');

    // Assert
    assert.ok(spy.calledOnce);
  });
});
