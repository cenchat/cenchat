import { fillIn } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

import sinon from 'sinon';

module('Integration | Component | cen-textarea', (hooks) => {
  setupRenderingTest(hooks);

  test('should show label', async function (assert) {
    assert.expect(1);

    // Act
    await this.render(hbs`<CenTextarea @label="Foo" />`);

    // Assert
    assert.dom('div:first-of-type').hasText('Foo');
  });

  test('should fire an external action with the filled in value when input is valid', async function (assert) {
    assert.expect(1);

    // Arrange
    const stub = sinon.stub();

    this.set('onInput', stub);

    await this.render(hbs`<CenTextarea @label="Foo" @onInput={{action this.onInput}} />`);

    // Act
    await fillIn('textarea', 'Foo');

    // Assert
    assert.ok(stub.calledWithExactly('Foo'));
  });

  test('should fire an external action with a null value when input is invalid', async function (assert) {
    assert.expect(1);

    // Arrange
    const stub = sinon.stub();

    this.set('onInput', stub);

    await this.render(hbs`
      <CenTextarea required="true" @label="Foo" @onInput={{action this.onInput}} />
    `);

    // Act
    await fillIn('textarea', '');

    // Assert
    assert.ok(stub.calledWithExactly(null));
  });

  test('should show feedback when input is invalid', async function (assert) {
    assert.expect(1);

    // Arrange
    await this.render(hbs`
      <CenTextarea required="true" @label="Foo" />
    `);

    // Act
    await fillIn('textarea', '');

    // Assert
    assert.dom('[role="alert"]').exists();
  });
});
