import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | sign-in', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    const route = this.owner.lookup('route:sign-in');
    assert.ok(route);
  });
});
