import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import EmberObject from '@ember/object';

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

  test('should set scrim visibility to true', function (assert) {
    assert.expect(1);

    // Arrange
    const route = this.owner.lookup('route:application');
    const controller = EmberObject.create();
    const transition = { promise: Promise.resolve() };

    sinon.stub(route, 'controllerFor').returns(controller);

    // Act
    route.send('loading', transition);

    // Assert
    assert.equal(controller.isScrimVisible, true);
  });

  test('should set scrim visibility to false after transition resolves', async function (assert) {
    assert.expect(1);

    // Arrange
    const route = this.owner.lookup('route:application');
    const controller = EmberObject.create();
    const transition = { promise: Promise.resolve() };

    sinon.stub(route, 'controllerFor').returns(controller);

    // Act
    await route.send('loading', transition);

    // Assert
    await transition;
    assert.equal(controller.isScrimVisible, false);
  });
});
