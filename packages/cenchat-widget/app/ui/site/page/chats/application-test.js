import { click, currentURL, visit } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';

import { authenticateSession } from 'ember-simple-auth/test-support';
import { setupApplicationTestState, timeout } from '@cenchat/shared/test-support';

module('Acceptance | site/page/chats', function (hooks) {
  setupApplicationTest(hooks);

  hooks.beforeEach(function () {
    setupApplicationTestState();
  });

  test('should transition to site.page.chats.new when clicking start chat and chat for current user does not exist', async function (assert) {
    assert.expect(1);

    // Arrange
    await visit('/sites/site_a/pages/page_a/chats');

    // Act
    await click('[data-test-top-bar="start-chat-button"]');

    // Assert
    assert.equal(currentURL(), '/sites/site_a/pages/page_a/chats/new');
  });

  test('should transition to site.page.chats.chat when clicking start chat and chat for current user exists', async function (assert) {
    assert.expect(1);

    // Arrange
    await authenticateSession({
      user: { uid: 'user_b' },
    });
    await visit('/sites/site_a/pages/page_a/chats');

    // Act
    await click('[data-test-top-bar="start-chat-button"]');

    // Assert
    assert.equal(currentURL(), '/sites/site_a/pages/page_a/chats/site_a__page_a__user_b');
  });

  test('should display a collection of public chats', async function (assert) {
    assert.expect(1);

    // Act
    await visit('/sites/site_a/pages/page_a/chats');

    // Assert
    await timeout(100); // Wait for relationships to load
    assert.dom('[data-test-chat-collection-item="host"]').exists({ count: 1 });
  });
});
