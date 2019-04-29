import { click, fillIn, render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

import sinon from 'sinon';

module('Integration | Component | sign-in-card-view-verification-profile', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    this.set('email', 'user_a@gmail.com');
    this.set('onSignInEvent', () => {});
  });

  test('should fire an external action when clicking sign in', async function (assert) {
    assert.expect(1);

    // Arrange
    const spy = sinon.spy(this, 'onSignInEvent');

    await render(hbs`<SignInCardViewVerificationProfile @email={{this.email}} @onSignInEvent={{this.onSignInEvent}} />`);

    // Act
    await fillIn('[data-test-sign-in-card-view-verification-profile="username"] input', 'user_a');
    await click('[data-test-sign-in-card-view-verification-profile="sign-in-button"]');

    // Assert
    assert.ok(spy.calledWith('email-link', 'user_a@gmail.com', 'user_a'));
  });
});
