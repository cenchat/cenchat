import { click, fillIn, render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

import { setupAuthState, setupTestState } from '@cenchat/shared/test-support';
import sinon from 'sinon';

module('Integration | Component | sign-in-card-view-email', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    setupTestState();

    this.set('isAnonymousSignInAllowed', true);
    this.set('redirectUrl', null);
    this.set('onSignInEvent', () => {});
  });

  test('should send sign in link to email when clicking send link', async function (assert) {
    assert.expect(1);

    // Arrange
    const firebase = this.owner.lookup('service:firebase');
    const stub = sinon.stub().returns(Promise.resolve());

    firebase.auth = () => ({ sendSignInLinkToEmail: stub });

    await render(hbs`
      <SignInCardViewEmail
        @isAnonymousSignInAllowed={{this.isAnonymousSignInAllowed}}
        @redirectUrl={{this.redirectUrl}}
        @onSignInEvent={{this.onSignInEvent}}
      />
    `);

    // Act
    await fillIn('[data-test-sign-in-card-view-email="email"] input', 'foo@gmail.com');
    await click('[data-test-sign-in-card-view-email="send-link-button"]');

    // Assert
    assert.ok(stub.calledOnce);
  });

  test('should show continue anonymously message when allowed', async function (assert) {
    assert.expect(1);

    // Act
    await render(hbs`
      <SignInCardViewEmail
        @isAnonymousSignInAllowed={{this.isAnonymousSignInAllowed}}
        @redirectUrl={{this.redirectUrl}}
        @onSignInEvent={{this.onSignInEvent}}
      />
    `);

    // Assert
    assert.dom('[data-test-sign-in-card-view-email="continue-anonymously-message"]').exists();
  });

  test('should hide continue anonymously message when not allowed', async function (assert) {
    assert.expect(1);

    // Arrange
    this.set('isAnonymousSignInAllowed', false);

    // Act
    await render(hbs`
      <SignInCardViewEmail
        @isAnonymousSignInAllowed={{this.isAnonymousSignInAllowed}}
        @redirectUrl={{this.redirectUrl}}
        @onSignInEvent={{this.onSignInEvent}}
      />
    `);

    // Assert
    assert.dom('[data-test-sign-in-card-view-email="continue-anonymously-message"]').doesNotExist();
  });

  test('should hide continue anonymously message when allowed but already signed in anonymously', async function (assert) {
    assert.expect(1);

    // Arrange
    await setupAuthState({
      user: { uid: 'user_a', isAnonymous: true },
    });
    this.set('isAnonymousSignInAllowed', true);

    // Act
    await render(hbs`
      <SignInCardViewEmail
        @isAnonymousSignInAllowed={{this.isAnonymousSignInAllowed}}
        @redirectUrl={{this.redirectUrl}}
        @onSignInEvent={{this.onSignInEvent}}
      />
    `);

    // Assert
    assert.dom('[data-test-sign-in-card-view-email="continue-anonymously-message"]').doesNotExist();
  });

  test('should fire an external action when clicking continue anonymously', async function (assert) {
    assert.expect(1);

    // Arrange
    const spy = sinon.spy(this, 'onSignInEvent');

    await render(hbs`
      <SignInCardViewEmail
        @isAnonymousSignInAllowed={{this.isAnonymousSignInAllowed}}
        @redirectUrl={{this.redirectUrl}}
        @onSignInEvent={{this.onSignInEvent}}
      />
    `);

    // Act
    await click('[data-test-sign-in-card-view-email="continue-anonymously-button"]');

    // Assert
    assert.ok(spy.calledWith('anonymous'));
  });
});
