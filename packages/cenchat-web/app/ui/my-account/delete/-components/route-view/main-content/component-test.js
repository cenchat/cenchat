import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | my-account/delete/-components/route-view/main-content/main-content', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    this.set('onDeleteAccountFormSubmit', () => {});
  });

  test('should show <DeleteAccountCaptcha />', async function (assert) {
    assert.expect(1);

    // Act
    await render(hbs`{{my-account/delete/-components/route-view/main-content onDeleteAccountFormSubmit=(action this.onDeleteAccountFormSubmit)}}`);

    // Assert
    assert.dom('[data-test-delete-account-captcha="host"]').exists();
  });
});
