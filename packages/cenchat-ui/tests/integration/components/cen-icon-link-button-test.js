import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | cen-icon-link-button', function (hooks) {
  setupRenderingTest(hooks);

  test('should render', async function (assert) {
    assert.expect(1);

    // Act
    await render(hbs`<CenIconLinkButton href="/sign-in" @icon="sign-in-alt" />`);

    // Assert
    assert.dom('a').hasAttribute('href', '/sign-in');
  });
});
