import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | cen-subheader', function (hooks) {
  setupRenderingTest(hooks);

  test('should render', async function (assert) {
    assert.expect(1);

    // Act
    await render(hbs`<CenSubheader>Yield</CenSubheader>`);

    // Assert
    assert.dom('header').hasText('Yield');
  });
});
