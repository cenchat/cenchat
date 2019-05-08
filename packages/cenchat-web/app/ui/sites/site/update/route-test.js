import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

import { setupTestState } from '@cenchat/shared/test-support';
import sinon from 'sinon';

module('Unit | Route | sites/site/edit', function (hooks) {
  setupTest(hooks);

  hooks.beforeEach(function () {
    setupTestState();
  });

  test('should use the model of sites.site route', function (assert) {
    assert.expect(1);

    // Arrange
    const route = this.owner.lookup('route:sites/site/update');

    sinon.stub(route, 'modelFor').withArgs('sites.site').returns('foo');

    // Act
    const result = route.model();

    // Assert
    assert.equal(result, 'foo');
  });
});
