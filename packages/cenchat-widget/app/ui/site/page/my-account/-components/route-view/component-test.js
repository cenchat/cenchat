import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

import { setupTestState } from '@cenchat/shared/test-support';

module('Integration | Component | site/page/my-account/-components/route-view', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    setupTestState();
  });

  test('should show <MainContent />', async function (assert) {
    assert.expect(1);

    // Act
    await render(hbs`{{site/page/my-account/-components/route-view}}`);

    // Assert
    assert.dom('[data-test-main-content="host"]').exists();
  });
});
