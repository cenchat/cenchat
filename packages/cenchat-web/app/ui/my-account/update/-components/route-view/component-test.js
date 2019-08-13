import { module, test } from 'qunit';
import { render } from '@ember/test-helpers';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

import { setupTestState } from '@cenchat/shared/test-support';

module('Integration | Component | my-account/update/-components/route-view', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function () {
    setupTestState();

    const store = this.owner.lookup('service:store');
    const user = await store.findRecord('user', 'user_a');

    this.set('user', user);
    this.set('hasPendingProfileChanges', false);
    this.set('onProfileUpdateEvent', () => {});
    this.set('onProfileFormSubmit', () => {});
  });

  test('should show <TopBar />', async function (assert) {
    assert.expect(1);

    // Act
    await render(hbs`
      {{my-account/update/-components/route-view
        user=this.user
        hasPendingProfileChanges=this.hasPendingProfileChanges
        onProfileUpdateEvent=(fn this.onProfileUpdateEvent)
        onProfileFormSubmit=(fn this.onProfileFormSubmit)
      }}
    `);

    // Assert
    assert.dom('[data-test-top-bar="host"]').exists();
  });

  test('should show <MainContent />', async function (assert) {
    assert.expect(1);

    // Act
    await render(hbs`
      {{my-account/update/-components/route-view
        user=this.user
        hasPendingProfileChanges=this.hasPendingProfileChanges
        onProfileUpdateEvent=(fn this.onProfileUpdateEvent)
        onProfileFormSubmit=(fn this.onProfileFormSubmit)
      }}
    `);

    // Assert
    assert.dom('[data-test-main-content="host"]').exists();
  });
});
