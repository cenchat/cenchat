import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

import { setupTestState } from '@cenchat/shared/test-support';

module('Integration | Component | sites/-components/route-view', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function () {
    setupTestState();

    const store = this.owner.lookup('service:store');
    const user = await store.findRecord('user', 'user_a');
    const sitesAsAdmin = await user.get('sitesAsAdmin');
    const sitesAsModerator = await user.get('sitesAsModerator');

    this.set('sitesAsAdmin', sitesAsAdmin);
    this.set('sitesAsModerator', sitesAsModerator);
  });

  test('should show <MainContent />', async function (assert) {
    assert.expect(1);

    // Act
    await render(hbs`{{sites/-components/route-view sitesAsAdmin=this.sitesAsAdmin sitesAsModerator=this.sitesAsModerator}}`);

    // Assert
    assert.dom('[data-test-main-content="host"]').exists();
  });
});
