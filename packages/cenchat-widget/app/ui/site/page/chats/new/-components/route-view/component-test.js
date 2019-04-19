import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

import { setupTestState } from '@cenchat/shared/test-support';

module('Integration | Component | site/page/chats/new/-components/route-view', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function () {
    setupTestState();

    this.set('onSendMessageClick', () => {});
  });

  test('should show anonymous hint when signed out', async function (assert) {
    assert.expect(1);

    // Arrange
    const session = this.owner.lookup('service:session');

    session.set('isAuthenticated', false);

    // Act
    await render(hbs`{{site/page/chats/new/-components/route-view onSendMessageClick=(action this.onSendMessageClick)}}`);

    // Assert
    assert.dom('[data-test-route-view="anonymous-banner"]').exists();
  });

  test('should show anonymous hint when signed in anonymously', async function (assert) {
    assert.expect(1);

    // Arrange
    const session = this.owner.lookup('service:session');

    session.set('isAuthenticated', true);
    session.set('data', {
      authenticated: {
        user: { isAnonymous: true },
      },
    });

    // Act
    await render(hbs`{{site/page/chats/new/-components/route-view onSendMessageClick=(action this.onSendMessageClick)}}`);

    // Assert
    assert.dom('[data-test-route-view="anonymous-banner"]').exists();
  });

  test('should hide anonymous hint when signed in with a non-anonymous account', async function (assert) {
    assert.expect(1);

    // Arrange
    const session = this.owner.lookup('service:session');

    session.set('isAuthenticated', true);
    session.set('data', {
      authenticated: {
        user: { isAnonymous: false },
      },
    });

    // Act
    await render(hbs`{{site/page/chats/new/-components/route-view onSendMessageClick=(action this.onSendMessageClick)}}`);

    // Assert
    assert.dom('[data-test-route-view="anonymous-banner"]').doesNotExist();
  });
});
