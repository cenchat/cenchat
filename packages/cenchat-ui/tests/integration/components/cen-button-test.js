import { click, render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

import sinon from 'sinon';

module('Integration | Component | cen-button', function (hooks) {
  setupRenderingTest(hooks);

  test('should show yield', async function (assert) {
    assert.expect(1);

    // Act
    await render(hbs`<CenButton>Yield</CenButton>`);

    // Assert
    assert.dom('button').hasText('Yield');
  });

  test('should fire an external action when clicking button', async function (assert) {
    assert.expect(1);

    // Arrange
    const stub = sinon.stub();

    this.set('onClick', stub);

    await render(hbs`<CenButton @onClick={{action this.onClick}}>Yield</CenButton>`);

    // Act
    await click('button');

    // Assert
    assert.ok(stub.calledOnce);
  });
});
