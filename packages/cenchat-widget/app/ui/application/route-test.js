import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

import sinon from 'sinon';

module('Unit | Route | application', function (hooks) {
  setupTest(hooks);

  test('should preload session model when signed in', async function (assert) {
    assert.expect(1);

    // Arrange
    const session = this.owner.lookup('service:session');

    session.set('data', {
      authenticated: {
        user: { uid: 'user_a' },
      },
    });
    session.set('isAuthenticated', true);

    const store = this.owner.lookup('service:store');
    const stub = sinon.stub(store, 'findRecord').returns(Promise.resolve());

    const route = this.owner.lookup('route:application');

    // Act
    await route.afterModel();

    // Assert
    assert.ok(stub.calledWithExactly('user', 'user_a'));
  });
});
