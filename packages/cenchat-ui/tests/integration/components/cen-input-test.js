import { fillIn } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

import sinon from 'sinon';

module('Integration | Component | cen-input', (hooks) => {
  setupRenderingTest(hooks);

  test('should show label', async function (assert) {
    assert.expect(1);

    // Act
    await this.render(hbs`<CenInput type="text" @label="Foo" />`);

    // Assert
    assert.dom('div:first-of-type').hasText('Foo');
  });

  test('should fire an external action with the filled in value when input is valid', async function (assert) {
    assert.expect(1);

    // Arrange
    const stub = sinon.stub();

    this.set('onInput', stub);

    await this.render(hbs`<CenInput type="text" @label="Foo" @onInput={{action this.onInput}} />`);

    // Act
    await fillIn('input', 'Foo');

    // Assert
    assert.ok(stub.calledWithExactly('Foo'));
  });

  test('should fire an external action with a null value when input is invalid', async function (assert) {
    assert.expect(1);

    // Arrange
    const stub = sinon.stub();

    this.set('onInput', stub);

    await this.render(hbs`
      <CenInput
        type="text"
        title="Letters only"
        pattern="[A-Za-z]*"
        @label="Foo"
        @onInput={{action this.onInput}}
      />
    `);

    // Act
    await fillIn('input', '123');

    // Assert
    assert.ok(stub.calledWithExactly(null));
  });

  test('should show feedback when input is invalid', async function (assert) {
    assert.expect(1);

    // Arrange
    await this.render(hbs`<CenInput data-test="host" type="number" min="0" @label="Foo" />`);

    // Act
    await fillIn('input', '-1');

    // Assert
    assert.dom('[role="alert"]').exists();
  });

  test('should show title as feedback when input pattern is invalid', async function (assert) {
    assert.expect(1);

    // Arrange
    await this.render(hbs`
      <CenInput
        type="text"
        title="Letters only"
        pattern="[A-Za-z]*"
        @label="Foo"
      />
    `);

    // Act
    await fillIn('input', '123');

    // Assert
    assert.dom('[role="alert"]').hasText('Letters only');
  });
});
