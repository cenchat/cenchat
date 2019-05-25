import { module, test } from 'qunit';
import { render } from '@ember/test-helpers';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

import { timeout } from '@cenchat/shared/test-support';

module('Integration | Helper | await', function (hooks) {
  setupRenderingTest(hooks);

  test('should show the resolved value of a property', async function (assert) {
    assert.expect(1);

    // Arrange
    this.set('property', Promise.resolve('Foo'));

    // Act
    await render(hbs`<div data-test="content">{{await this.property}}</div>`);

    // Assert
    assert.dom('[data-test="content"]').hasText('Foo');
  });

  test('should show the resolved value of a new promise when changing it', async function (assert) {
    assert.expect(1);

    // Arrange
    this.set('property', Promise.resolve('Foo'));

    // Act
    await render(hbs`<div data-test="content">{{await this.property}}</div>`);

    this.set('property', Promise.resolve('Bar'));

    // Assert
    await timeout(100); // Wait for new promise to settle
    assert.dom('[data-test="content"]').hasText('Bar');
  });
});
