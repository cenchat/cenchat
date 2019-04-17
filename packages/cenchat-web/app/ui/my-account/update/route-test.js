import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

import sinon from 'sinon';

module('Unit | Route | my-account/update', function (hooks) {
  setupTest(hooks);

  test('should use model of my-account route as the model', async function (assert) {
    assert.expect(1);

    // Arrange
    const route = this.owner.lookup('route:my-account/update');

    sinon.stub(route, 'modelFor').withArgs('my-account').returns('foo');

    // Act
    const result = await route.model();

    // Assert
    assert.equal(result, 'foo');
  });
});
