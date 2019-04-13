import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

import { setupAuthState } from '@cenchat/shared/test-support';
import sinon from 'sinon';

module('Unit | Route | application', function (hooks) {
  setupTest(hooks);

  test('should transition to sign-in route when signed out', async function (assert) {
    assert.expect(1);

    // Arrange
    const route = this.owner.lookup('route:application');
    const stub = sinon.stub(route, 'transitionTo');

    // Act
    await route.beforeModel();

    // Assert
    assert.ok(stub.calledWithExactly('sign-in'));
  });

  test('should preload session model when signed in', async function (assert) {
    assert.expect(1);

    // Arrange
    await setupAuthState({
      user: { uid: 'user_a' },
    });

    const store = this.owner.lookup('service:store');
    const stub = sinon.stub(store, 'findRecord').returns(Promise.resolve());
    const route = this.owner.lookup('route:application');

    // Act
    await route.afterModel();

    // Assert
    assert.ok(stub.calledWithExactly('user', 'user_a'));
  });

  test('should transition to chats route when signed in', async function (assert) {
    assert.expect(1);

    // Arrange
    await setupAuthState({
      user: { uid: 'user_a' },
    });

    const route = this.owner.lookup('route:application');
    const stub = sinon.stub(route, 'transitionTo');

    // Act
    route.redirect(null, { targetName: 'index' });

    // Assert
    assert.ok(stub.calledWithExactly('chats'));
  });
});
