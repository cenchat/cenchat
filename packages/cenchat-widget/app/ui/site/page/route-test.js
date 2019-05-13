import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import EmberObject from '@ember/object';

import sinon from 'sinon';

import { setupTestState } from '@cenchat/shared/test-support';

module('Unit | Route | site/page', function (hooks) {
  setupTest(hooks);

  hooks.beforeEach(function () {
    setupTestState();
  });

  test('should return page as model when it exists', async function (assert) {
    assert.expect(1);

    // Arrange
    const route = this.owner.lookup('route:site/page');

    sinon.stub(route, 'modelFor').withArgs('site').returns({ id: 'site_a' });

    // Act
    const result = await route.model({ page_postfix_id: 'page_a' });

    // Assert
    assert.equal(result.get('id'), 'site_a__page_a');
  });

  test('should create page and return it as model when it does not exist', async function (assert) {
    assert.expect(1);

    // Arrange
    const server = sinon.fakeServer.create();

    server.respondImmediately = true;

    server.respondWith(
      'POST',
      'https://us-central1-cenchat-app-staging.cloudfunctions.net/app/api/pages',
      [204, { 'Content-Type': 'application/json' }, ''],
    );

    const route = this.owner.lookup('route:site/page');

    sinon.stub(route, 'paramsFor').returns({ slug: '/slug' });
    sinon.stub(route, 'modelFor').withArgs('site').returns({ id: 'site_a' });
    sinon
      .stub(route.store, 'findRecord')
      .withArgs('page', 'site_a__page_100')
      .onFirstCall()
      .returns(Promise.reject())
      .onSecondCall()
      .returns(Promise.resolve(EmberObject.create({ id: 'site_a__page_100' })));

    // Act
    const result = await route.model({ page_postfix_id: 'page_100' });

    // Assert
    assert.equal(result.get('id'), 'site_a__page_100');
  });

  test('should return nothing when page and slug does not exist', async function (assert) {
    assert.expect(1);

    // Arrange
    const route = this.owner.lookup('route:site/page');

    sinon.stub(route, 'modelFor').withArgs('site').returns({ id: 'site_a' });

    // Act
    const result = await route.model({ page_postfix_id: 'page_100' });

    // Assert
    assert.equal(result, null);
  });

  test('should transition to error when model could not be resolved', async function (assert) {
    assert.expect(1);

    // Arrange
    const route = this.owner.lookup('route:site/page');
    const stub = sinon.stub(route, 'transitionTo');

    // Act
    await route.afterModel(null);

    // Assert
    assert.ok(stub.calledWithExactly('error'));
  });

  test('should redirect to site.page.chats when model is available and transition target is site.page.index', function (assert) {
    assert.expect(1);

    // Arrange
    const route = this.owner.lookup('route:site/page');
    const transitionToStub = sinon.stub(route, 'transitionTo');

    // Act
    route.redirect({ id: 'site_a__page_a' }, { targetName: 'site.page.index' });

    // Assert
    assert.ok(transitionToStub.calledWithExactly('site.page.chats'));
  });

  test('should not redirect to site.page.chats when model is unavailable', function (assert) {
    assert.expect(1);

    // Arrange
    const route = this.owner.lookup('route:site/page');
    const transitionToStub = sinon.stub(route, 'transitionTo');

    // Act
    route.redirect();

    // Assert
    assert.ok(transitionToStub.notCalled);
  });

  test('should redirect to site.page.chats when transition target is not site.page.index', function (assert) {
    assert.expect(1);

    // Arrange
    const route = this.owner.lookup('route:site/page');
    const transitionToStub = sinon.stub(route, 'transitionTo');

    // Act
    route.redirect({ id: 'site_a__page_a' }, { targetName: 'site.page.chats.index' });

    // Assert
    assert.ok(transitionToStub.notCalled);
  });
});
