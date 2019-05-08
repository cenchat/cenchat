import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

import { setupTestState } from '@cenchat/shared/test-support';

module('Integration | Component | sites/site/update/-components/route-view/main-content', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function () {
    setupTestState();

    const store = this.owner.lookup('service:store');
    const site = await store.findRecord('site', 'site_a');

    this.set('site', site);
    this.set('onSiteUpdateEvent', () => {});
    this.set('onSiteFormSubmit', () => {});
  });

  test('should show <SiteForm />', async function (assert) {
    assert.expect(1);

    // Act
    await render(hbs`
      {{sites/site/update/-components/route-view/main-content
        site=this.site
        onSiteUpdateEvent=(action this.onSiteUpdateEvent)
        onSiteFormSubmit=(action this.onSiteFormSubmit)
      }}
    `);

    // Assert
    assert.dom('[data-test-site-form="host"]').exists();
  });
});
