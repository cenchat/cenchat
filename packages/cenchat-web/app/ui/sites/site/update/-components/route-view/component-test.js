import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

import { setupTestState } from '@cenchat/shared/test-support';

module('Integration | Component | sites/site/update/-components/route-view', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function () {
    setupTestState();

    const store = this.owner.lookup('service:store');
    const site = await store.findRecord('site', 'site_a');

    this.set('site', site);
    this.set('hasPendingSiteChanges', false);
    this.set('onSiteUpdateEvent', () => {});
    this.set('onSiteFormSubmit', () => {});
  });

  test('should show <TopBar />', async function (assert) {
    assert.expect(1);

    // Act
    await render(hbs`
      {{sites/site/update/-components/route-view
        site=this.site
        hasPendingSiteChanges=this.hasPendingSiteChanges
        onSiteUpdateEvent=(fn this.onSiteUpdateEvent)
        onSiteFormSubmit=(fn this.onSiteFormSubmit)
      }}
    `);

    // Assert
    assert.dom('[data-test-top-bar="host"]').exists();
  });

  test('should show <SiteForm />', async function (assert) {
    assert.expect(1);

    // Act
    await render(hbs`
      {{sites/site/update/-components/route-view
        site=this.site
        hasPendingSiteChanges=this.hasPendingSiteChanges
        onSiteUpdateEvent=(fn this.onSiteUpdateEvent)
        onSiteFormSubmit=(fn this.onSiteFormSubmit)
      }}
    `);

    // Assert
    assert.dom('[data-test-main-content="host"]').exists();
  });
});
