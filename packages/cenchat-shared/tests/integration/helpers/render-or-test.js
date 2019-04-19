import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Helper | render-or', function (hooks) {
  setupRenderingTest(hooks);

  test('should render first value when available', async function (assert) {
    assert.expect(1);

    // Arrange
    this.set('firstValue', 'Foo');

    // Act
    await render(hbs`{{render-or firstValue "Bar"}}`);

    // Assert
    assert.equal(this.element.textContent.trim(), 'Foo');
  });

  test('should render second value when first value is unavailable', async function (assert) {
    assert.expect(1);

    // Arrange
    this.set('firstValue', null);

    // Act
    await render(hbs`{{render-or firstValue "Bar"}}`);

    // Assert
    assert.equal(this.element.textContent.trim(), 'Bar');
  });
});
