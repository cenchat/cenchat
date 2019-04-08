import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | site/page/chats/chat', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    const route = this.owner.lookup('route:site/page/chats/chat');
    assert.ok(route);
  });
});
