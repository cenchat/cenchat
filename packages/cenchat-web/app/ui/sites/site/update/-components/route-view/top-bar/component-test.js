import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

import { setupTestState } from '@cenchat/shared/test-support';

module('Integration | Component | sites/site/update/-components/route-view/top-bar', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    setupTestState();
  });

  test('should enable save button when info is dirty', async function (assert) {
    assert.expect(1);

    // Arrange
    this.set('hasPendingSiteChanges', true);

    // Act
    await render(hbs`{{sites/site/update/-components/route-view/top-bar hasPendingSiteChanges=this.hasPendingSiteChanges}}`);

    // Assert
    assert.dom('[data-test-top-bar="save-button"]').isNotDisabled();
  });

  test('should disable save button when info is not dirty', async function (assert) {
    assert.expect(1);

    // Arrange
    this.set('hasPendingSiteChanges', false);

    // Act
    await render(hbs`{{sites/site/update/-components/route-view/top-bar hasPendingSiteChanges=this.hasPendingSiteChanges}}`);

    // Assert
    assert.dom('[data-test-top-bar="save-button"]').isDisabled();
  });
});
