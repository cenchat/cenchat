import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

import { setupTestState } from '@cenchat/shared/test-support';

module('Integration | Component | my-account/-components/route-view/main-content/profile-card', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function () {
    setupTestState();

    const store = this.owner.lookup('service:store');
    const user = await store.findRecord('user', 'user_a');

    this.set('user', user);
  });

  test('should show user info', async function (assert) {
    assert.expect(1);

    // Act
    await render(hbs`{{my-account/-components/route-view/main-content/profile-card user=this.user}}`);

    // Assert
    assert.dom('[data-test-profile-card="name"]').hasText('user_a');
  });
});
