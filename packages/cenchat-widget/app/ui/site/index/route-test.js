import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import EmberObject from '@ember/object';

import sinon from 'sinon';

import { setupTestState } from '@cenchat/shared/test-support';

module('Unit | Route | site/index', function (hooks) {
  setupTest(hooks);

  hooks.beforeEach(function () {
    setupTestState();
  });

  test('should redirect to site.page with the page ID when querying for page is successful', async function (assert) {
    assert.expect(1);

    // Arrange
    const route = this.owner.lookup('route:site/index');
    const stub = sinon.stub(route, 'transitionTo');

    sinon.stub(route, 'paramsFor').returns({ slug: '/foo/bar' });
    sinon.stub(route, 'modelFor').withArgs('site').returns({ id: 'site_a' });

    // Act
    await route.beforeModel();

    // Assert
    assert.ok(stub.calledWithExactly('site.page', 'page_a'));
  });

  test('should redirect to site.page with the new page ID when creating a new page succeeds', async function (assert) {
    assert.expect(1);

    // Arrange
    const server = sinon.fakeServer.create();

    server.respondImmediately = true;

    server.respondWith(
      'POST',
      'https://us-central1-cenchat-stg.cloudfunctions.net/app/pages',
      [200, { 'Content-Type': 'application/json' }, ''],
    );

    const route = this.owner.lookup('route:site/index');
    const stub = sinon.stub(route, 'transitionTo');

    sinon.stub(route, 'paramsFor').returns({ slug: '/slug' });
    sinon.stub(route, 'modelFor').withArgs('site').returns({ id: 'site_a' });
    sinon
      .stub(route.store, 'findRecord')
      .returns(Promise.resolve(EmberObject.create({ id: 'site_a__page_100' })));

    // Act
    await route.beforeModel();

    // Assert
    assert.ok(stub.calledWith('site.page', 'page_100'));
  });

  test('should not redirect to site.page when slug is unavailable', async function (assert) {
    assert.expect(1);

    // Arrange
    const route = this.owner.lookup('route:site/index');
    const stub = sinon.stub(route, 'transitionTo');

    // Act
    await route.beforeModel();

    // Assert
    assert.ok(stub.notCalled);
  });
});
