import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | cen-icon', function (hooks) {
  setupRenderingTest(hooks);

  test('should render icon', async function (assert) {
    assert.expect(1);

    // Act
    await render(hbs`<CenIcon @icon="square" />`);

    // Assert
    assert.dom('svg').hasAttribute('data-icon', 'square');
  });
});
