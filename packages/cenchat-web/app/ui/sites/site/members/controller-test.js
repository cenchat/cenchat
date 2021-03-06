import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

import { setupAuthState, setupTestState } from '@cenchat/shared/test-support';
import sinon from 'sinon';

module('Unit | Controller | sites/site/members', function (hooks) {
  setupTest(hooks);

  hooks.beforeEach(async function () {
    setupTestState();

    const store = this.owner.lookup('service:store');
    const site = await store.findRecord('site', 'site_b');

    this.set('site', site);
    this.set('model', {
      admins: await site.get('admins'),
      moderators: await site.get('moderators'),
    });
  });

  test('should keep track of role changes when assigning a user to admin role', async function (assert) {
    assert.expect(1);

    // Arrange
    const controller = this.owner.lookup('controller:sites/site/members');
    const store = this.owner.lookup('service:store');
    const user = await store.findRecord('user', 'user_a');

    controller.set('model', this.model);

    // Act
    controller.handleRoleChange(user, { target: { value: 'admins' } });

    // Arrange
    assert.deepEqual(controller.pendingRoleChange, {
      admins: ['user_a'],
      moderators: [],
      none: [],
    });
  });

  test('should keep track of role changes when assigning a user to moderator role', async function (assert) {
    assert.expect(1);

    // Arrange
    const controller = this.owner.lookup('controller:sites/site/members');
    const store = this.owner.lookup('service:store');
    const user = await store.findRecord('user', 'user_b');

    controller.set('model', this.model);

    // Act
    controller.handleRoleChange(user, { target: { value: 'moderators' } });

    // Arrange
    assert.deepEqual(controller.pendingRoleChange, {
      admins: [],
      moderators: ['user_b'],
      none: [],
    });
  });

  test('should keep track of role changes when assigning a user to none role', async function (assert) {
    assert.expect(1);

    // Arrange
    const controller = this.owner.lookup('controller:sites/site/members');
    const store = this.owner.lookup('service:store');
    const user = await store.findRecord('user', 'user_a');

    controller.set('model', this.model);

    // Act
    controller.handleRoleChange(user, { target: { value: 'none' } });

    // Arrange
    assert.deepEqual(controller.pendingRoleChange, {
      admins: [],
      moderators: [],
      none: ['user_a'],
    });
  });

  test('should not track role changes when assigning an admin role to an admin', async function (assert) {
    assert.expect(1);

    // Arrange
    const controller = this.owner.lookup('controller:sites/site/members');
    const store = this.owner.lookup('service:store');
    const user = await store.findRecord('user', 'user_b');

    controller.set('model', this.model);

    // Act
    controller.handleRoleChange(user, { target: { value: 'admins' } });

    // Arrange
    assert.deepEqual(controller.pendingRoleChange, {
      admins: [],
      moderators: [],
      none: [],
    });
  });

  test('should not track role changes when assigning a moderator role to a moderator', async function (assert) {
    assert.expect(1);

    // Arrange
    const controller = this.owner.lookup('controller:sites/site/members');
    const store = this.owner.lookup('service:store');
    const user = await store.findRecord('user', 'user_a');

    controller.set('model', this.model);

    // Act
    controller.handleRoleChange(user, { target: { value: 'moderators' } });

    // Arrange
    assert.deepEqual(controller.pendingRoleChange, {
      admins: [],
      moderators: [],
      none: [],
    });
  });

  test('should not track role changes when assigning a none role to user who is not a member', async function (assert) {
    assert.expect(1);

    // Arrange
    const controller = this.owner.lookup('controller:sites/site/members');
    const store = this.owner.lookup('service:store');
    const user = await store.findRecord('user', 'user_c');

    controller.set('model', this.model);

    // Act
    controller.handleRoleChange(user, { target: { value: 'none' } });

    // Arrange
    assert.deepEqual(controller.pendingRoleChange, {
      admins: [],
      moderators: [],
      none: [],
    });
  });

  test('should reset role change tracker when saving role changes', async function (assert) {
    assert.expect(1);

    // Arrange
    await setupAuthState({
      user: { uid: 'user_a', getIdToken: sinon.stub().returns(Promise.resolve()) },
    });

    const server = sinon.fakeServer.create();

    server.autoRespond = true;
    server.autoRespondAfter = 0;

    server.respondWith(
      'POST',
      'https://us-central1-cenchat-app-staging.cloudfunctions.net/app/api/utils/update-site-roles',
      [204, {}, ''],
    );

    const controller = this.owner.lookup('controller:sites/site/members');

    sinon.stub(controller, 'transitionToRoute');

    controller.set('router', {
      currentRoute: {
        parent: { attributes: this.site },
      },
    });
    controller.set('model', this.model);
    controller.set('pendingRoleChange', {
      admins: ['user_a'],
      moderators: ['user_b'],
      none: ['user_c'],
    });

    // Act
    await controller.handleSaveRolesClick();

    // Assert
    assert.deepEqual(controller.searchedUsers, []);
  });

  test('should reset role change tracker when saving role changes', async function (assert) {
    assert.expect(1);

    // Arrange
    await setupAuthState({
      user: { uid: 'user_a', getIdToken: sinon.stub().returns(Promise.resolve()) },
    });

    const server = sinon.fakeServer.create();

    server.autoRespond = true;
    server.autoRespondAfter = 0;

    server.respondWith(
      'POST',
      'https://us-central1-cenchat-app-staging.cloudfunctions.net/app/api/utils/update-site-roles',
      [204, {}, ''],
    );

    const controller = this.owner.lookup('controller:sites/site/members');

    sinon.stub(controller, 'transitionToRoute');

    controller.set('router', {
      currentRoute: {
        parent: { attributes: this.site },
      },
    });
    controller.set('model', this.model);
    controller.set('pendingRoleChange', {
      admins: ['user_a'],
      moderators: ['user_b'],
      none: ['user_c'],
    });

    // Act
    await controller.handleSaveRolesClick();

    // Assert
    assert.deepEqual(controller.pendingRoleChange, {
      admins: [],
      moderators: [],
      none: [],
    });
  });

  test('should be able to search for non-member users', async function (assert) {
    assert.expect(2);

    // Arrange
    const controller = this.owner.lookup('controller:sites/site/members');

    controller.set('model', this.model);

    // Act
    await controller.handleSearchUserInput('user');

    // Assert
    assert.deepEqual(controller.searchedUsers.firstObject.get('id'), 'user_c');
    assert.equal(controller.searchedUsers.length, 2);
  });
});
