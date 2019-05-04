import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

import { setupTestState } from '@cenchat/shared/test-support';

module('Integration | Component | route-view', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function () {
    setupTestState();

    this.set('hasPendingSiteChanges', false);
    this.set('onSiteUpdateEvent', () => {});
    this.set('onSiteFormSubmit', () => {});
  });

  test('should show <TopBar />', async function (assert) {
    assert.expect(1);

    // Act
    await render(hbs`
      {{sites/new/-components/route-view
        hasPendingSiteChanges=this.hasPendingSiteChanges
        onSiteUpdateEvent=(action this.onSiteUpdateEvent)
        onSiteFormSubmit=(action this.onSiteFormSubmit)
      }}
    `);

    // Assert
    assert.dom('[data-test-top-bar="host"]').exists();
  });

  test('should show <SiteForm />', async function (assert) {
    assert.expect(1);

    // Act
    await render(hbs`
      {{sites/new/-components/route-view
        hasPendingSiteChanges=this.hasPendingSiteChanges
        onSiteUpdateEvent=(action this.onSiteUpdateEvent)
        onSiteFormSubmit=(action this.onSiteFormSubmit)
      }}
    `);

    // Assert
    assert.dom('[data-test-main-content="host"]').exists();
  });
});
