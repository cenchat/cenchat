import { currentURL, visit } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import EmberObject from '@ember/object';

import sinon from 'sinon';

import { setupTestState } from '@cenchat/shared/test-support';

module('Acceptance | site/index', function (hooks) {
  setupApplicationTest(hooks);

  hooks.beforeEach(function () {
    setupTestState();
  });

  test('should redirect to site.page when record for page exists', async function (assert) {
    assert.expect(1);

    // Act
    await visit('/sites/site_a?slug=%2Ffoo%2Fbar');

    // Assert
    assert.equal(currentURL(), '/sites/site_a/pages/page_a/chats?slug=%2Ffoo%2Fbar');
  });

  test('should create page and redirect to site.page when record for page does not exist yet', async function (assert) {
    assert.expect(1);

    // Arrange
    const server = sinon.fakeServer.create();

    server.respondImmediately = true;

    server.respondWith(
      'POST',
      'https://us-central1-cenchat-stg.cloudfunctions.net/app/pages',
      [200, { 'Content-Type': 'application/json' }, ''],
    );

    const store = this.owner.lookup('service:store');

    sinon
      .stub(store, 'findRecord')
      .returns(Promise.resolve(EmberObject.create({ id: 'site_a__page_100' })));

    // Act
    await visit('/sites/site_a?slug=foobardee');

    // Assert
    assert.equal(currentURL(), '/sites/site_a/pages/page_100/chats?slug=foobardee');
  });
});
