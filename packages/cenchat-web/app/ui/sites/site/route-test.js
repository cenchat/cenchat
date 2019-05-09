import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

import { setupAuthState, setupTestState } from '@cenchat/shared/test-support';
import sinon from 'sinon';

module('Unit | Route | sites/site', function (hooks) {
  setupTest(hooks);

  hooks.beforeEach(async function () {
    setupTestState();

    const store = this.owner.lookup('service:store');
    const site = await store.findRecord('site', 'site_a');

    this.set('site', site);
  });

  test('should use site as the model', async function (assert) {
    assert.expect(1);

    // Arrange
    const route = this.owner.lookup('route:sites/site');

    // Act
    const result = await route.model({ site_id: 'site_a' });

    // Assert
    assert.equal(result.get('id'), 'site_a');
  });

  test('should transition back to sites route when current user is not member', async function (assert) {
    assert.expect(1);

    // Arrange
    await setupAuthState({
      user: { uid: 'user_b' },
    });

    const route = this.owner.lookup('route:sites/site');
    const stub = sinon.stub(route, 'transitionTo');

    // Act
    await route.afterModel(this.site);

    // Assert
    assert.ok(stub.calledWithExactly('sites'));
  });

  test('should not transition back to sites route when current user is member', async function (assert) {
    assert.expect(1);

    // Arrange
    await setupAuthState({
      user: { uid: 'user_a' },
    });

    const route = this.owner.lookup('route:sites/site');
    const stub = sinon.stub(route, 'transitionTo');

    // Act
    await route.afterModel(this.site);

    // Assert
    assert.ok(stub.notCalled);
  });
});
