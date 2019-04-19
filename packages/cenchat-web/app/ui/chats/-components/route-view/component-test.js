import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | chats/-components/route-view', function (hooks) {
  setupRenderingTest(hooks);

  test('should show <MainContent />', async function (assert) {
    assert.expect(1);

    // Act
    await render(hbs`{{chats/-components/route-view}}`);

    // Assert
    assert.dom('[data-test-main-content="host"]').exists();
  });
});
