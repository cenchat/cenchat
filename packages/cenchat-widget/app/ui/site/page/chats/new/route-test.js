import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

import { setupAuthState, setupTestState } from '@cenchat/shared/test-support';
import sinon from 'sinon';

module('Unit | Route | site/page/chats/new', function (hooks) {
  setupTest(hooks);

  hooks.beforeEach(function () {
    setupTestState();
  });

  test('should redirect to current user chat when signed in and the record exists', async function (assert) {
    assert.expect(1);

    // Arrange
    await setupAuthState({
      user: { uid: 'user_b' },
    });

    const route = this.owner.lookup('route:site/page/chats/new');
    const stub = sinon.stub(route, 'replaceWith');
    const store = this.owner.lookup('service:store');
    const page = await store.findRecord('page', 'site_a__page_a');

    sinon.stub(route, 'modelFor').withArgs('site.page').returns(page);

    // Act
    await route.beforeModel();

    // Assert
    assert.ok(stub.calledWithExactly('site.page.chats.chat', 'site_a__page_a__user_b'));
  });

  test('should not redirect when signed out', async function (assert) {
    assert.expect(1);

    // Arrange
    const route = this.owner.lookup('route:site/page/chats/new');
    const stub = sinon.stub(route, 'replaceWith');
    const store = this.owner.lookup('service:store');
    const page = await store.findRecord('page', 'site_a__page_a');

    sinon.stub(route, 'modelFor').withArgs('site.page').returns(page);

    // Act
    await route.beforeModel();

    // Assert
    assert.ok(stub.notCalled);
  });

  test('should not redirect when signed in but the record does not exist', async function (assert) {
    assert.expect(1);

    // Arrange
    await setupAuthState({
      user: { uid: 'user_a' },
    });

    const route = this.owner.lookup('route:site/page/chats/new');
    const stub = sinon.stub(route, 'replaceWith');
    const store = this.owner.lookup('service:store');
    const page = await store.findRecord('page', 'site_a__page_a');

    sinon.stub(route, 'modelFor').withArgs('site.page').returns(page);

    // Act
    await route.beforeModel();

    // Assert
    assert.ok(stub.notCalled);
  });

  test('should return a new chat record as the model', function (assert) {
    assert.expect(1);

    // Arrange
    const route = this.owner.lookup('route:site/page/chats/new');
    const modelForStub = sinon.stub(route, 'modelFor');

    modelForStub.withArgs('site').returns('Site');
    modelForStub.withArgs('site.page').returns('Page');

    // Act
    const result = route.model();

    // Assert
    assert.deepEqual(result, { isPublic: false, page: 'Page', site: 'Site' });
  });
});
