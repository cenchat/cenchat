import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

import { setupAuthState, setupTestState } from '@cenchat/shared/test-support';
import sinon from 'sinon';

module('Unit | Controller | my-account', function (hooks) {
  setupTest(hooks);

  hooks.beforeEach(async function () {
    setupTestState();
  });

  test('should be able to sign out', async function (assert) {
    assert.expect(1);

    // Arrange
    await setupAuthState({
      user: { uid: 'user_a' },
    });

    const session = this.owner.lookup('service:session');
    const spy = sinon.spy(session, 'invalidate');
    const controller = this.owner.lookup('controller:my-account');

    sinon.stub(controller, 'transitionToRoute');

    // Act
    await controller.handleSignOutClick();

    // Arrange
    assert.ok(spy.calledOnce);
  });

  test('should transition to sign-in route after signing out', async function (assert) {
    assert.expect(1);

    // Arrange
    await setupAuthState({
      user: { uid: 'user_a' },
    });

    const controller = this.owner.lookup('controller:my-account');
    const stub = sinon.stub(controller, 'transitionToRoute');

    // Act
    await controller.handleSignOutClick();

    // Arrange
    assert.ok(stub.calledWithExactly('sign-in'));
  });
});
