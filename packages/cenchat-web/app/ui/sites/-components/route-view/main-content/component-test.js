import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

import { setupTestState } from '@cenchat/shared/test-support';

module('Integration | Component | sites/-components/route-view/main-content', function (hooks) {
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

  test('should show the verified sites the current user is an admin of', async function (assert) {
    assert.expect(2);

    // Act
    await render(hbs`{{sites/-components/route-view/main-content sitesAsAdmin=this.sitesAsAdmin sitesAsModerator=this.sitesAsModerator}}`);

    // Assert
    assert.dom('[data-test-main-content="admin-sites"]').exists();
    assert.dom('[data-test-main-content="admin-sites"] [data-test-site-collection="host"]').exists();
  });

  test('should show sites the current user is a moderator of', async function (assert) {
    assert.expect(2);

    // Act
    await render(hbs`{{sites/-components/route-view/main-content sitesAsAdmin=this.sitesAsAdmin sitesAsModerator=this.sitesAsModerator}}`);

    // Assert
    assert.dom('[data-test-main-content="moderator-sites"]').exists();
    assert.dom('[data-test-main-content="moderator-sites"] [data-test-site-collection="host"]').exists();
  });

  test('should show empty state when there are no sites at all', async function (assert) {
    assert.expect(1);

    // Arrange
    this.set('sitesAsAdmin', []);
    this.set('sitesAsModerator', []);

    // Act
    await render(hbs`{{sites/-components/route-view/main-content sitesAsAdmin=this.sitesAsAdmin sitesAsModerator=this.sitesAsModerator}}`);

    // Assert
    assert.dom('[data-test-main-content="empty-state"]').exists();
  });
});
