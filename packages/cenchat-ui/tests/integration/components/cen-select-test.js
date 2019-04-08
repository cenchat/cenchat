import { fillIn } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

import sinon from 'sinon';

module('Integration | Component | cen-select', (hooks) => {
  setupRenderingTest(hooks);

  test('should show label', async function (assert) {
    assert.expect(1);

    // Act
    await this.render(hbs`<CenSelect @label="Foo" />`);

    // Assert
    assert.dom('div:first-of-type').hasText('Foo');
  });

  test('should fire an external action when changing select field', async function (assert) {
    assert.expect(1);

    // Arrange
    const stub = sinon.stub();

    this.set('onChange', stub);

    await this.render(hbs`
      <CenSelect @label="Foo" @onChange={{action this.onChange}}>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </CenSelect>
    `);

    // Act
    await fillIn('select', 'Female');

    // Assert
    assert.ok(stub.calledWithExactly('Female'));
  });

  test('should show yield for select field type', async function (assert) {
    assert.expect(1);

    // Act
    await this.render(hbs`
      <CenSelect @label="Foo">
        <option data-test="option"></option>
      </CenSelect>
    `);

    // Assert
    assert.dom('option').exists();
  });
});
