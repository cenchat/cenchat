import {
  click,
  currentURL,
  fillIn,
  visit,
} from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';

import { authenticateSession } from 'ember-simple-auth/test-support';
import { setupTestState } from '@cenchat/shared/test-support';

module('Acceptance | site/page/chats/new', function (hooks) {
  setupApplicationTest(hooks);

  hooks.beforeEach(function () {
    setupTestState();
  });

  test('should transition to site.page.chats.new after sending a message', async function (assert) {
    assert.expect(1);

    // Arrange
    await authenticateSession({
      user: { uid: 'user_d' },
    });
    await visit('/sites/site_a/pages/page_a/chats/new');

    // Act
    await fillIn('[data-test-chat-composer="message-field"]', 'Foo');
    await click('[data-test-chat-composer="send-message-button"]');

    // Assert
    assert.equal(currentURL(), '/sites/site_a/pages/page_a/chats/site_a__page_a__user_d');
  });
});
