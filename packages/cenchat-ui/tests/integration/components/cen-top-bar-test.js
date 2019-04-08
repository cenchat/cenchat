import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | cen-top-bar', function (hooks) {
  setupRenderingTest(hooks);

  test('should render', async function (assert) {
    assert.expect(1);

    // Act
    await render(hbs`<CenTopBar>Yield</CenTopBar>`);

    // Assert
    assert.dom('header').hasText('Yield');
  });
});
