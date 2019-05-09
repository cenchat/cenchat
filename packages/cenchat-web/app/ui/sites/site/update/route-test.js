import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

import { setupAuthState, setupTestState } from '@cenchat/shared/test-support';
import sinon from 'sinon';

module('Unit | Route | sites/site/edit', function (hooks) {
  setupTest(hooks);

  hooks.beforeEach(async function () {
    setupTestState();

    const store = this.owner.lookup('service:store');
    const site = await store.findRecord('site', 'site_a');

    this.set('site', site);
  });

  test('should transition back to sites.site route when current user is not an admin', async function (assert) {
    assert.expect(1);

    // Arrange
    await setupAuthState({
      user: { uid: 'user_b' },
    });

    const route = this.owner.lookup('route:sites/site/update');
    const stub = sinon.stub(route, 'transitionTo');

    sinon.stub(route, 'modelFor').withArgs('sites.site').returns(this.site);

    // Act
    await route.beforeModel();

    // Assert
    assert.ok(stub.calledWithExactly('sites.site'));
  });

  test('should not transition back to sites.site route when current user is an admin', async function (assert) {
    assert.expect(1);

    // Arrange
    await setupAuthState({
      user: { uid: 'user_a' },
    });

    const route = this.owner.lookup('route:sites/site/update');
    const stub = sinon.stub(route, 'transitionTo');

    sinon.stub(route, 'modelFor').withArgs('sites.site').returns(this.site);

    // Act
    await route.beforeModel();

    // Assert
    assert.ok(stub.notCalled);
  });

  test('should use the model of sites.site route', function (assert) {
    assert.expect(1);

    // Arrange
    const route = this.owner.lookup('route:sites/site/update');

    sinon.stub(route, 'modelFor').withArgs('sites.site').returns(this.site);

    // Act
    const result = route.model();

    // Assert
    assert.equal(result.get('id'), 'site_a');
  });
});
