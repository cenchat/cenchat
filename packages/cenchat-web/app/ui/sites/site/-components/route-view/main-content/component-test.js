import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

import { setupTestState } from '@cenchat/shared/test-support';

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

    // Act
    await render(hbs`{{sites/site/-components/route-view/main-content site=this.site}}`);

    // Assert
    assert.dom('[data-test-site-info="host"]').exists();
  });
});
