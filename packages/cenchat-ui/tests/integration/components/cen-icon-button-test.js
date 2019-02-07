import { click, render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

import sinon from 'sinon';

module('Integration | Component | cen-icon-button', function (hooks) {
  setupRenderingTest(hooks);

  test('should render icon', async function (assert) {
    assert.expect(1);

    // Act
    await render(hbs`<CenIconButton @icon="square" />`);

    // Assert
    assert.dom('svg').hasAttribute('data-icon', 'square');
  });

  test('should fire an external action when clicking button', async function (assert) {
    assert.expect(1);

    // Arrange
    const stub = sinon.stub();

    this.set('onClick', stub);

    await render(hbs`<CenIconButton @icon="square" @onClick={{action this.onClick}} />`);

    // Act
    await click('button');

    // Assert
    assert.ok(stub.calledOnce);
  });
});
