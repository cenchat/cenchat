import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

import { setupAuthState, setupTestState } from '@cenchat/shared/test-support';

module('Integration | Component | sites/site/-components/route-view/main-content/site-info', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function () {
    setupTestState();

    const store = this.owner.lookup('service:store');
    const site = await store.findRecord('site', 'site_a');

    this.set('site', site);
  });

  test('should show site info', async function (assert) {
    assert.expect(5);

    // Arrange
    await setupAuthState({
      user: { uid: 'user_a' },
    });

    // Act
    await render(hbs`{{sites/site/-components/route-view/main-content/site-info site=this.site}}`);

    // Assert
    assert.dom('[data-test-site-info="id"]').hasText('site_a');
    assert.dom('[data-test-site-info="display-name"]').hasText('Site A');
    assert.dom('[data-test-site-info="hostname"]').hasText('site-a.com');
    assert.dom('[data-test-site-info="brand-color"]').hasText('#212121');
    assert.dom('[data-test-site-info="theme"]').hasText('light');
  });

  test('should show update link when current user is an admin', async function (assert) {
    assert.expect(1);

    // Arrange
    await setupAuthState({
      user: { uid: 'user_a' },
    });

    // Act
    await render(hbs`{{sites/site/-components/route-view/main-content/site-info site=this.site}}`);

    // Assert
    assert.dom('[data-test-site-info="update-link"]').exists();
  });

  test('should hide update link when current user is not an admin', async function (assert) {
    assert.expect(1);

    // Arrange
    await setupAuthState({
      user: { uid: 'user_b' },
    });

    // Act
    await render(hbs`{{sites/site/-components/route-view/main-content/site-info site=this.site}}`);

    // Assert
    assert.dom('[data-test-site-info="update-link"]').doesNotExist();
  });
});
