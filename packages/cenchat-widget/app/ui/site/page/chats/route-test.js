import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

import sinon from 'sinon';

import { setupTestState } from '@cenchat/shared/test-support';

module('Unit | Route | site/page/chats', function (hooks) {
  setupTest(hooks);

  hooks.beforeEach(function () {
    setupTestState();
  });

  test('should return page public chats as the model', async function (assert) {
    assert.expect(1);

    // Arrange
    const route = this.owner.lookup('route:site/page/chats');
    const store = this.owner.lookup('service:store');
    const page = await store.findRecord('page', 'site_a__page_a');

    sinon.stub(route, 'modelFor').returns(page);

    // Act
    const result = await route.model();

    // Assert
    assert.equal(result.length, 1);
  });
});
