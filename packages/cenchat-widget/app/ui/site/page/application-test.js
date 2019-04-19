import { currentURL, visit } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import EmberObject from '@ember/object';

import sinon from 'sinon';

import { setupApplicationTestState } from '@cenchat/shared/test-support';

module('Acceptance | site/page', function (hooks) {
  setupApplicationTest(hooks);

  hooks.beforeEach(function () {
    setupApplicationTestState();
  });

  test('should redirect to site.page.chats when record for page exists', async function (assert) {
    assert.expect(1);

    // Act
    await visit('/sites/site_a/pages/page_a');

    // Assert
    assert.equal(currentURL(), '/sites/site_a/pages/page_a/chats');
  });

  test('should create page and redirect to site.page.chats when record for page does not exist yet', async function (assert) {
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
    await visit('/sites/site_a/pages/page_100?slug=foobardee');

    // Assert
    assert.equal(currentURL(), '/sites/site_a/pages/page_100/chats?slug=foobardee');
  });
});
