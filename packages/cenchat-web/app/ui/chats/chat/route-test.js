import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | chats/chat', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    const route = this.owner.lookup('route:chats/chat');
    assert.ok(route);
  });
});
