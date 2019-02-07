import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | cen-link-button', function (hooks) {
  setupRenderingTest(hooks);

  test('should render', async function (assert) {
    assert.expect(2);

    // Act
    await render(hbs`<CenLink href="/sign-in">Yield</CenLink>`);

    // Assert
    assert.dom('a').hasText('Yield');
    assert.dom('a').hasAttribute('href', '/sign-in');
  });
});
