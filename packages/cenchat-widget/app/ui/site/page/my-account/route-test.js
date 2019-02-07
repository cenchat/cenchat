import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | site/page/my-account', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    const route = this.owner.lookup('route:site/page/my-account');
    assert.ok(route);
  });
});
