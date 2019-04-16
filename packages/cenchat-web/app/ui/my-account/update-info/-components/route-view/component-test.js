import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

import { setupTestState } from '@cenchat/shared/test-support';

module('Integration | Component | my-account/update-info/-components/route-view', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    setupTestState();

    this.set('onSaveInfoClick', () => {});
  });

  test('should show <TopBar />', async function (assert) {
    assert.expect(1);

    // Act
    await render(hbs`{{my-account/update-info/-components/route-view onSaveInfoClick=(action this.onSaveInfoClick)}}`);

    // Assert
    assert.dom('[data-test-top-bar="host"]').exists();
  });
});
