import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

import { setupAuthState, setupTestState } from '@cenchat/shared/test-support';

module('Integration | Component | site/page/my-account/-components/route-view/main-content', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    setupTestState();
  });

  test('should show tips when current user has an anonymous account', async function (assert) {
    assert.expect(1);

    // Arrange
    await setupAuthState({
      user: { uid: 'user_a', isAnonymous: true },
    });

    // Act
    await render(hbs`{{site/page/my-account/-components/route-view/main-content}}`);

    // Assert
    assert.dom('[data-test-main-content="tips"]').exists();
  });

  test('should show tips when current user has an non-anonymous account', async function (assert) {
    assert.expect(1);

    // Arrange
    await setupAuthState({
      user: { uid: 'user_a', isAnonymous: false },
    });

    // Act
    await render(hbs`{{site/page/my-account/-components/route-view/main-content}}`);

    // Assert
    assert.dom('[data-test-main-content="tips"]').doesNotExist();
  });
});
