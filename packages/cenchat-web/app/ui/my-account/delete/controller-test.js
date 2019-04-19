import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

import { setupAuthState, setupTestState } from '@cenchat/shared/test-support';
import sinon from 'sinon';

module('Unit | Controller | my-account/delete', function (hooks) {
  setupTest(hooks);

  hooks.beforeEach(function () {
    setupTestState();
  });

  test('should be able to delete account', async function (assert) {
    assert.expect(1);

    // Arrange
    await setupAuthState({
      user: { uid: 'user_a', getIdToken: sinon.stub().returns(Promise.resolve()) },
    });

    const controller = this.owner.lookup('controller:my-account/delete');
    const server = sinon.fakeServer.create();

    server.respondImmediately = true;

    server.respondWith(
      'POST',
      'https://us-central1-cenchat-app-staging.cloudfunctions.net/app/api/users',
      [200, { 'Content-Type': 'application/json' }, ''],
    );

    // Act
    await controller.handleDeleteAccountFormSubmit();

    // Assert
    assert.ok(true);
  });

  test('should sign out when deleting account', async function (assert) {
    assert.expect(1);

    // Arrange
    await setupAuthState({
      user: { uid: 'user_a', getIdToken: sinon.stub().returns(Promise.resolve()) },
    });

    const session = this.owner.lookup('service:session');
    const spy = sinon.spy(session, 'invalidate');
    const controller = this.owner.lookup('controller:my-account/delete');
    const server = sinon.fakeServer.create();

    server.respondImmediately = true;

    server.respondWith(
      'POST',
      'https://us-central1-cenchat-app-staging.cloudfunctions.net/app/api/users',
      [200, { 'Content-Type': 'application/json' }, ''],
    );

    // Act
    await controller.handleDeleteAccountFormSubmit();

    // Assert
    assert.ok(spy.calledOnce);
  });
});
