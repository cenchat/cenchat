import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

import { setupTestState } from '@cenchat/shared/test-support';

module('Unit | Route | sites/site', function (hooks) {
  setupTest(hooks);

  hooks.beforeEach(function () {
    setupTestState();
  });

  test('should use site as the model', async function (assert) {
    assert.expect(1);

    // Arrange
    const route = this.owner.lookup('route:sites/site');

    // Act
    const result = await route.model({ site_id: 'site_a' });

    // Assert
    assert.equal(result.get('id'), 'site_a');
  });
});
