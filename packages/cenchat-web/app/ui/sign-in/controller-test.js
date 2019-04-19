import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

import sinon from 'sinon';

module('Unit | Controller | sign-in', function (hooks) {
  setupTest(hooks);

  test('should transition to chats route after signing in', function (assert) {
    assert.expect(1);

    // Arrange
    const controller = this.owner.lookup('controller:sign-in');
    const stub = sinon.stub(controller, 'transitionToRoute');

    // Act
    controller.handleAfterSignInEvent();

    // Assert
    assert.ok(stub.calledWithExactly('chats'));
  });
});
