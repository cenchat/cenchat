import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

import { setupAuthState, setupTestState } from '@cenchat/shared/test-support';
import sinon from 'sinon';

module('Unit | Route | sites/site/members', function (hooks) {
  setupTest(hooks);

  hooks.beforeEach(async function () {
    setupTestState();

    const store = this.owner.lookup('service:store');
    const site = await store.findRecord('site', 'site_b');

    this.set('site', site);
  });

  test('should transition back to sites.site route when current user is not an admin', async function (assert) {
    assert.expect(1);

    // Arrange
    await setupAuthState({
      user: { uid: 'user_a' },
    });

    const route = this.owner.lookup('route:sites/site/members');
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
      user: { uid: 'user_b' },
    });

    const route = this.owner.lookup('route:sites/site/members');
    const stub = sinon.stub(route, 'transitionTo');

    sinon.stub(route, 'modelFor').withArgs('sites.site').returns(this.site);

    // Act
    await route.beforeModel();

    // Assert
    assert.ok(stub.notCalled);
  });

  test('should use site admins and moderators as models', async function (assert) {
    assert.expect(2);

    // Arrange
    await setupAuthState({
      user: { uid: 'user_b' },
    });

    const route = this.owner.lookup('route:sites/site/members');

    sinon.stub(route, 'modelFor').withArgs('sites.site').returns(this.site);

    // Act
    const result = await route.model();

    // Assert
    assert.equal(result.admins.get('length'), 1);
    assert.equal(result.moderators.get('length'), 1);
  });
});
