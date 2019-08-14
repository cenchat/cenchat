import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

import { setupTestState } from '@cenchat/shared/test-support';

module('Integration | Component | my-account/delete/-components/route-view', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    setupTestState();

    this.set('onDeleteAccountFormSubmit', () => {});
  });

  test('should show <MainContent />', async function (assert) {
    assert.expect(1);

    // Act
    await render(hbs`{{my-account/delete/-components/route-view onDeleteAccountFormSubmit=(fn this.onDeleteAccountFormSubmit)}}`);

    // Assert
    assert.dom('[data-test-main-content="host"]').exists();
  });
});
