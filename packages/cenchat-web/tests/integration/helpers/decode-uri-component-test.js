import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Helper | decode-uri-component', function (hooks) {
  setupRenderingTest(hooks);

  test('should decode uri component', async function (assert) {
    assert.expect(1);

    // Arrange
    this.set('inputValue', 'http://example.com%2Ffoo%2Fbar');

    // Act
    await render(hbs`{{decode-uri-component this.inputValue}}`);

    // Assert
    assert.equal(this.element.textContent.trim(), 'http://example.com/foo/bar');
  });
});
