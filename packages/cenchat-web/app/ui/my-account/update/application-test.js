import { click, fillIn, visit } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';

import { setupAuthState, setupApplicationTestState } from '@cenchat/shared/test-support';
import sinon from 'sinon';

module('Acceptance | my-account/update', function (hooks) {
  setupApplicationTest(hooks);

  hooks.beforeEach(function () {
    setupApplicationTestState();
  });

  test('should be able to update the user profile', async function (assert) {
    assert.expect(1);

    // Arrange
    await setupAuthState({
      user: { uid: 'user_a', updateProfile: sinon.stub().returns(Promise.resolve()) },
    });

    // Act
    await visit('/my-account/update');
    await fillIn('[data-test-profile-form="display-username"] input', 'new_name');
    await click('[data-test-top-bar="save-button"]');

    // Assert
    assert.dom('[data-test-application="toast"]').hasText('Profile updated');
  });
});
