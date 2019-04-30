import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | sites', function (hooks) {
  setupTest(hooks);

  test('should use sites the user is an admin of as the model', function (assert) {
    const route = this.owner.lookup('route:sites');
    assert.notOk(route);
  });
});
