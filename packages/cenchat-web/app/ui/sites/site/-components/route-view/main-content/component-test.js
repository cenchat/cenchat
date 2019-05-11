import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

import { setupAuthState, setupTestState } from '@cenchat/shared/test-support';

module('Integration | Component | sites/site/-components/route-view/main-content', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function () {
    setupTestState();

    const store = this.owner.lookup('service:store');
    const site = await store.findRecord('site', 'site_a');

    this.set('site', site);
  });

  test('should show <SiteInfo />', async function (assert) {
    assert.expect(1);

    // Arrange
    await setupAuthState({
      user: { uid: 'user_a' },
    });

    // Act
    await render(hbs`{{sites/site/-components/route-view/main-content site=this.site}}`);

    // Assert
    assert.dom('[data-test-site-info="host"]').exists();
  });

  test('should show tips when user is an admin', async function (assert) {
    assert.expect(1);

    // Arrange
    await setupAuthState({
      user: { uid: 'user_a' },
    });

    // Act
    await render(hbs`{{sites/site/-components/route-view/main-content site=this.site}}`);

    // Assert
    assert.dom('[data-test-main-content="tips"]').exists();
  });

  test('should hide tips when user is not an admin', async function (assert) {
    assert.expect(1);

    // Arrange
    await setupAuthState({
      user: { uid: 'user_b' },
    });

    // Act
    await render(hbs`{{sites/site/-components/route-view/main-content site=this.site}}`);

    // Assert
    assert.dom('[data-test-main-content="tips"]').doesNotExist();
  });
});
