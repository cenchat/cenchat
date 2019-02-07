import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

import sinon from 'sinon';

module('Unit | Route | site/page/chats/new', function (hooks) {
  setupTest(hooks);

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
