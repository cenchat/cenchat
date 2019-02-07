import { click, render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

import sinon from 'sinon';

module('Integration | Component | cen-form', function (hooks) {
  setupRenderingTest(hooks);

  test('should fire an external action when submitting form', async function (assert) {
    assert.expect(1);

    // Arrange
    const stub = sinon.stub();

    this.set('onSubmit', stub);

    await render(hbs`
      <CenForm @onSubmit={{action this.onSubmit}}>
        <button type="submit">Submit</button>
      </CenForm>
    `);

    // Act
    await click('button');

    // Assert
    assert.ok(stub.calledOnce);
  });
});
