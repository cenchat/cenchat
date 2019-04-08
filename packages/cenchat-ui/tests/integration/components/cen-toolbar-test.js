import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | cen-toolbar', function (hooks) {
  setupRenderingTest(hooks);

  test('should render', async function (assert) {
    assert.expect(1);

    // Act
    await render(hbs`<CenToolbar>Yield</CenToolbar>`);

    // Assert
    assert.dom('div').hasText('Yield');
  });
});
