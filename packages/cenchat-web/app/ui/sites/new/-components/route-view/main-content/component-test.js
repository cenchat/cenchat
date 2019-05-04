import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

import { setupTestState } from '@cenchat/shared/test-support';

module('Integration | Component | sites/new/-components/route-view/main-content', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function () {
    setupTestState();

    this.set('onSiteUpdateEvent', () => {});
    this.set('onSiteFormSubmit', () => {});
  });

  test('should show <SiteForm />', async function (assert) {
    assert.expect(1);

    // Act
    await render(hbs`
      {{sites/new/-components/route-view/main-content
        onSiteUpdateEvent=(action this.onSiteUpdateEvent)
        onSiteFormSubmit=(action this.onSiteFormSubmit)
      }}
    `);

    // Assert
    assert.dom('[data-test-site-form="host"]').exists();
  });
});
