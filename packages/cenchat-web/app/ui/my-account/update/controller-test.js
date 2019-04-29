import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

import { setupAuthState, setupTestState } from '@cenchat/shared/test-support';
import sinon from 'sinon';

module('Unit | Controller | my-account/update', function (hooks) {
  setupTest(hooks);

  hooks.beforeEach(async function () {
    setupTestState();

    const store = this.owner.lookup('service:store');
    const user = await store.findRecord('user', 'user_a');

    this.set('model', user);
  });

  test('should track if profile has pending changes', function (assert) {
    assert.expect(1);

    // Arrange
    const controller = this.owner.lookup('controller:my-account/update');

    controller.set('model', this.model);
    controller.set('pendingProfileChange', { displayUsername: 'Foobar' });

    // Act
    const result = controller.get('hasPendingProfileChanges');

    // Arrange
    assert.ok(result);
  });

  test('should be able to handle update user profile events', function (assert) {
    assert.expect(1);

    // Arrange
    const controller = this.owner.lookup('controller:my-account/update');

    controller.set('model', this.model);

    // Act
    controller.handleProfileUpdateEvent({ displayUsername: 'Foobar' });

    // Arrange
    assert.deepEqual(controller.pendingProfileChange, { displayUsername: 'Foobar' });
  });

  test('should be able to save user profile updates', async function (assert) {
    assert.expect(2);

    // Arrange
    const stub = sinon.stub().returns(Promise.resolve);

    await setupAuthState({
      user: { uid: 'user_a', updateProfile: stub },
    });

    const controller = this.owner.lookup('controller:my-account/update');

    controller.set('model', this.model);
    controller.set('pendingProfileChange', { displayUsername: 'Foobar' });

    // Act
    await controller.handleProfileFormSubmit();

    // Arrange
    const db = this.owner.lookup('service:firebase').firestore();
    const userDocSnapshot = await db.doc('users/user_a').get();

    assert.deepEqual(userDocSnapshot.data(), {
      displayUsername: 'Foobar',
      photoUrl: 'user_a.jpg',
      shortBio: null,
      username: 'foobar',
    });
    assert.ok(stub.calledWithExactly({ displayName: 'Foobar' }));
  });
});
