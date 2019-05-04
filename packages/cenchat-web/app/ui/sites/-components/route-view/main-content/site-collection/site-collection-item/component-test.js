import { module, test } from 'qunit';
import { render } from '@ember/test-helpers';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

import { setupTestState } from '@cenchat/shared/test-support';

module('Integration | Component | sites/-components/route-view/main-content/site-collection/site-collection-item', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function () {
    setupTestState();

    const store = this.owner.lookup('service:store');
    const site = await store.findRecord('site', 'site_a');

    this.set('site', site);
  });

  test('should render site', async function (assert) {
    assert.expect(3);

    // Act
    await render(hbs`{{sites/-components/route-view/main-content/site-collection/site-collection-item site=this.site}}`);

    // Assert
    assert.dom('[data-test-site-collection-item="image"]').hasAttribute('src', 'site_a.jpg');
    assert.dom('[data-test-site-collection-item="name"]').hasText('Site A');
    assert.dom('[data-test-site-collection-item="hostname"]').hasText('site_a.com');
  });
});
