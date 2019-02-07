import { module, test } from 'qunit';
import { render } from '@ember/test-helpers';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

import sinon from 'sinon';

module('Integration | Component | sign-in-card-view', function (hooks) {
  setupRenderingTest(hooks);

  test('should show <SignInCardVerification /> when signing in with email link', async function (assert) {
    assert.expect(1);

    // Arrange
    const firebase = this.owner.lookup('service:firebase');
    const stub = sinon.stub(firebase, 'auth').returns({
      isSignInWithEmailLink: sinon.stub().returns(true),
    });

    // Act
    await render(hbs`<SignInCard />`);

    // Assert
    assert.dom('[data-test-sign-in-card-view-verification="host"]').exists();

    // Cleanup
    stub.restore();
  });

  test('should hide <SignInCardVerification /> when not signing in with email link', async function (assert) {
    assert.expect(1);

    // Arrange
    const firebase = this.owner.lookup('service:firebase');
    const stub = sinon.stub(firebase, 'auth').returns({
      isSignInWithEmailLink: sinon.stub().returns(false),
    });

    // Act
    await render(hbs`<SignInCard />`);

    // Assert
    assert.dom('[data-test-sign-in-card-view-verification="host"]').doesNotExist();

    // Cleanup
    stub.restore();
  });

  test('should show <SignInCardViewEmail /> when not signing in with email link', async function (assert) {
    assert.expect(1);

    // Arrange
    const firebase = this.owner.lookup('service:firebase');
    const stub = sinon.stub(firebase, 'auth').returns({
      isSignInWithEmailLink: sinon.stub().returns(false),
    });

    // Act
    await render(hbs`<SignInCard />`);

    // Assert
    assert.dom('[data-test-sign-in-card-view-email="host"]').exists();

    // Cleanup
    stub.restore();
  });

  test('should hide <SignInCardViewEmail /> when signing in with email link', async function (assert) {
    assert.expect(1);

    // Arrange
    const firebase = this.owner.lookup('service:firebase');
    const stub = sinon.stub(firebase, 'auth').returns({
      isSignInWithEmailLink: sinon.stub().returns(true),
    });

    // Act
    await render(hbs`<SignInCard />`);

    // Assert
    assert.dom('[data-test-sign-in-card-view-email="host"]').doesNotExist();

    // Cleanup
    stub.restore();
  });
});
