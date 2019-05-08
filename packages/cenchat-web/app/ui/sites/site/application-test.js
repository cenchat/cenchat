import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import { visit } from '@ember/test-helpers';

import { setupAuthState, setupApplicationTestState } from '@cenchat/shared/test-support';

module('Acceptance | sites/site', function (hooks) {
  setupApplicationTest(hooks);

  hooks.beforeEach(function () {
    setupApplicationTestState();
  });

  test('should be able to view the site info', async function (assert) {
    assert.expect(5);

    // Arrange
    await setupAuthState({
      user: { uid: 'user_a' },
    });

    // Act
    await visit('/sites/site_a');

    // Assert
    assert.dom('[data-test-site-info="id"]').hasText('site_a');
    assert.dom('[data-test-site-info="display-name"]').hasText('Site A');
    assert.dom('[data-test-site-info="hostname"]').hasText('site-a.com');
    assert.dom('[data-test-site-info="brand-color"]').hasText('#212121');
    assert.dom('[data-test-site-info="theme"]').hasText('light');
  });
});
