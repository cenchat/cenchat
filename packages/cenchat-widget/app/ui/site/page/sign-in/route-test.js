import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

import sinon from 'sinon';

module('Unit | Route | site/page/sign-in', function (hooks) {
  setupTest(hooks);

  test('should return model for site.page as the model', function (assert) {
    assert.expect(1);

    // Arrange
    const route = this.owner.lookup('route:site/page/sign-in');

    sinon.stub(route, 'modelFor').withArgs('site.page').returns('foo');

    // Act
    const result = route.model();

    // Assert
    assert.equal(result, 'foo');
  });
});
