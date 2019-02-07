import { click, fillIn, render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

import sinon from 'sinon';

module('Integration | Component | sign-in-card-view-verification', function (hooks) {
  setupRenderingTest(hooks);

  test('should show <SignInCardViewVerification /> when clicking continue and email does not exist yet', async function (assert) {
    assert.expect(1);

    // Arrange
    const firebase = this.owner.lookup('service:firebase');
    const stub = sinon.stub(firebase, 'auth').returns({
      fetchSignInMethodsForEmail: sinon.stub().withArgs('foo@gmail.com').returns([]),
    });

    this.set('onSignInEvent', () => {});

    await render(hbs`<SignInCardViewVerification @redirectUrl={{this.redirectUrl}} @onSignInEvent={{this.onSignInEvent}} />`);

    // Act
    await fillIn('[data-test-sign-in-card-view-verification="email-field"] input', 'foo@gmail.com');
    await click('[data-test-sign-in-card-view-verification="continue-button"]');

    // Assert
    assert.dom('[data-test-sign-in-card-view-verification-profile="host"]').exists();

    // Cleanup
    stub.restore();
  });
});
