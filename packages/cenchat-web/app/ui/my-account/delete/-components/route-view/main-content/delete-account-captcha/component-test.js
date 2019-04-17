import { click, fillIn, render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

import sinon from 'sinon';

module('Integration | Component | my-account/delete/-components/route-view/main-content/delete-account-captcha', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    this.set('onDeleteAccountFormSubmit', () => {});
  });

  test('should disable confirm delete button when inputting a wrong confirmation key', async function (assert) {
    assert.expect(1);

    // Act
    await render(hbs`{{my-account/delete/-components/route-view/main-content/delete-account-captcha onDeleteAccountFormSubmit=(action this.onDeleteAccountFormSubmit)}}`);
    await fillIn('[data-test-delete-account-captcha="confirm"] input', 'foobar');

    // Assert
    assert.dom('[data-test-delete-account-captcha="confirm-delete-button"]').isDisabled();
  });

  test('should enable confirm delete button when inputting a correct confirmation key', async function (assert) {
    assert.expect(1);

    // Act
    await render(hbs`{{my-account/delete/-components/route-view/main-content/delete-account-captcha onDeleteAccountFormSubmit=(action this.onDeleteAccountFormSubmit)}}`);

    const confirmationKey = this.element
      .querySelector('[data-test-delete-account-captcha="confirm"] div')
      .textContent
      .trim()
      .substr(26, 5);

    await fillIn('[data-test-delete-account-captcha="confirm"] input', confirmationKey);

    // Assert
    assert.dom('[data-test-delete-account-captcha="confirm-delete-button"]').isNotDisabled();
  });

  test('should fire an external action when clicking delete', async function (assert) {
    assert.expect(1);

    // Arrange
    const spy = sinon.spy(this, 'onDeleteAccountFormSubmit');

    // Act
    await render(hbs`{{my-account/delete/-components/route-view/main-content/delete-account-captcha onDeleteAccountFormSubmit=(action this.onDeleteAccountFormSubmit)}}`);

    const confirmationKey = this.element
      .querySelector('[data-test-delete-account-captcha="confirm"] div')
      .textContent
      .trim()
      .substr(26, 5);

    await fillIn('[data-test-delete-account-captcha="confirm"] input', confirmationKey);
    await click('[data-test-delete-account-captcha="confirm-delete-button"]');

    // Assert
    assert.ok(spy.calledOnce);
  });
});
