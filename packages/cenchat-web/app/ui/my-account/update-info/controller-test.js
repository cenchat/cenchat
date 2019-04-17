import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

import { setupTestState } from '@cenchat/shared/test-support';

module('Unit | Controller | my-account/update-info', function (hooks) {
  setupTest(hooks);

  hooks.beforeEach(async function () {
    setupTestState();

    const store = this.owner.lookup('service:store');
    const user = await store.findRecord('user', 'user_a');

    this.set('model', user);
  });

  test('should track if info is dirty', function (assert) {
    assert.expect(1);

    // Arrange
    const controller = this.owner.lookup('controller:my-account/update-info');

    controller.set('model', this.model);
    controller.set('info', { displayName: 'Foo Bar' });

    // Act
    const result = controller.get('isInfoDirty');

    // Arrange
    assert.ok(result);
  });

  test('should be able to handle update user info events', function (assert) {
    assert.expect(1);

    // Arrange
    const controller = this.owner.lookup('controller:my-account/update-info');

    controller.set('model', this.model);

    // Act
    controller.handleInfoUpdateEvent({ displayName: 'Foo Bar' });

    // Arrange
    assert.deepEqual(controller.info, { displayName: 'Foo Bar' });
  });

  test('should be able to save user info updates', async function (assert) {
    assert.expect(1);

    // Arrange
    const controller = this.owner.lookup('controller:my-account/update-info');

    controller.set('model', this.model);
    controller.set('info', { displayName: 'Foo Bar' });

    // Act
    await controller.handleInfoFormSubmit();

    // Arrange
    const db = this.owner.lookup('service:firebase').firestore();
    const userDocSnapshot = await db.doc('users/user_a').get();

    assert.deepEqual(userDocSnapshot.data(), {
      displayName: 'Foo Bar',
      displayUsername: null,
      name: 'foo bar',
      photoUrl: 'user_a.jpg',
      shortBio: null,
      username: null,
    });
  });
});
