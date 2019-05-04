import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

import { setupTestState } from '@cenchat/shared/test-support';

module('Integration | Component | sites/-components/route-view/main-content/site-collection', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function () {
    setupTestState();

    const store = this.owner.lookup('service:store');
    const user = await store.findRecord('user', 'user_a');
    const sites = await user.get('sitesAsAdmin');

    this.set('sites', sites);
  });

  test('should show <SiteCollectionItem /> per every site', async function (assert) {
    assert.expect(1);

    // Act
    await render(hbs`{{sites/-components/route-view/main-content/site-collection sites=this.sites}}`);

    // Assert
    assert.dom('[data-test-site-collection-item="host"]').exists({ count: 2 });
  });
});
