import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

import sinon from 'sinon';

import { setupAuthState, setupTestState } from '@cenchat/shared/test-support';

module('Unit | Route | site/page/chats', function (hooks) {
  setupTest(hooks);

  hooks.beforeEach(function () {
    setupTestState();
  });

  // test('should return page public chats as part of the model', async function (assert) {
  //   assert.expect(1);

  //   // Arrange
  //   const route = this.owner.lookup('route:site/page/chats');
  //   const store = this.owner.lookup('service:store');
  //   const page = await store.findRecord('page', 'site_a__page_a');

  //   sinon.stub(route, 'modelFor').returns(page);

  //   // Act
  //   const result = await route.model();

  //   // Assert
  //   assert.equal(result.publicChats.length, 1);
  // });

  test('should return current user chat as part of the model when authenticated', async function (assert) {
    assert.expect(1);

    // Arrange
    const route = this.owner.lookup('route:site/page/chats');
    const store = this.owner.lookup('service:store');
    const page = await store.findRecord('page', 'site_a__page_a');

    sinon.stub(route, 'modelFor').returns(page);
    await setupAuthState({
      user: { uid: 'user_c' },
    });

    // Act
    const result = await route.model();

    // Assert
    assert.equal(result.currentUserChat.get('id'), 'site_a__page_a__user_c');
  });

  test('should return null for the current user chat as part of the model when unauthenticated', async function (assert) {
    assert.expect(1);

    // Arrange
    const route = this.owner.lookup('route:site/page/chats');
    const store = this.owner.lookup('service:store');
    const page = await store.findRecord('page', 'site_a__page_a');

    sinon.stub(route, 'modelFor').returns(page);

    // Act
    const result = await route.model();

    // Assert
    assert.equal(result.currentUserChat, null);
  });
});
