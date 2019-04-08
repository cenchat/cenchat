import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | cen-nav-bar', function (hooks) {
  setupRenderingTest(hooks);

  test('should render', async function (assert) {
    assert.expect(1);

    // Act
    await render(hbs`<CenNavBar>Yield</CenNavBar>`);

    // Assert
    assert.dom('nav').hasText('Yield');
  });
});
