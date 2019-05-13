import { click, fillIn, visit } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';

import { setupApplicationTestState, setupAuthState, timeout } from '@cenchat/shared/test-support';
import sinon from 'sinon';

module('Acceptance | sites/site/members', (hooks) => {
  setupApplicationTest(hooks);

  hooks.beforeEach(async function () {
    await setupApplicationTestState(this);

    const server = sinon.fakeServer.create();

    server.autoRespond = true;
    server.autoRespondAfter = 0;

    server.respondWith(
      'POST',
      'https://us-central1-cenchat-app-staging.cloudfunctions.net/app/api/utils/update-site-roles',
      [204, {}, ''],
    );
  });

  test('should list admins and moderators', async function (assert) {
    assert.expect(2);

    // Arrange
    await setupAuthState({
      user: { uid: 'user_b', getIdToken: sinon.stub().returns(Promise.resolve('foobar')) },
    });

    // Act
    await visit('/sites/site_b/members');

    // Assert
    assert.dom('[data-test-main-content="admins"]').exists();
    assert.dom('[data-test-main-content="moderators"]').exists();
  });

  test('should add admins', async function (assert) {
    assert.expect(1);

    // Arrange
    await setupAuthState({
      user: { uid: 'user_b', getIdToken: sinon.stub().returns(Promise.resolve('foobar')) },
    });
    await visit('/sites/site_b/members');

    // Act
    await fillIn('[data-test-search-form="user"] input', 'user_c');
    await timeout('1000'); // FIXME: fillIn above doesn't wait that's why we force a timeout
    await fillIn('[data-test-search-form="host"] [data-test-member-list-item="role-field"]', 'admins');
    await click('[data-test-top-bar="save-button"]');

    // Assert
    assert.dom('[data-test-application="toast"]').hasText('Roles saved');
  });

  test('should remove admins', async function (assert) {
    assert.expect(1);

    // Arrange
    await setupAuthState({
      user: { uid: 'user_b', getIdToken: sinon.stub().returns(Promise.resolve('foobar')) },
    });
    await visit('/sites/site_b/members');

    // Act
    await fillIn('[data-test-search-form="user"] input', 'user_b');
    await fillIn('[data-test-member-list-item="role-field"]', 'none');
    await click('[data-test-top-bar="save-button"]');

    // Assert
    assert.dom('[data-test-application="toast"]').hasText('Roles saved');
  });

  test('should add moderators', async function (assert) {
    assert.expect(1);

    // Arrange
    await setupAuthState({
      user: { uid: 'user_b', getIdToken: sinon.stub().returns(Promise.resolve('foobar')) },
    });
    await visit('/sites/site_b/members');

    // Act
    await fillIn('[data-test-search-form="user"] input', 'user_c');
    await timeout('1000'); // FIXME: fillIn above doesn't wait that's why we force a timeout
    await fillIn('[data-test-search-form="host"] [data-test-member-list-item="role-field"]', 'moderators');
    await click('[data-test-top-bar="save-button"]');

    // Assert
    assert.dom('[data-test-application="toast"]').hasText('Roles saved');
  });

  test('should remove moderators', async function (assert) {
    assert.expect(1);

    // Arrange
    await setupAuthState({
      user: { uid: 'user_b', getIdToken: sinon.stub().returns(Promise.resolve('foobar')) },
    });
    await visit('/sites/site_b/members');

    // Act
    await fillIn('[data-test-search-form="user"] input', 'user_a');
    await fillIn('[data-test-member-list-item="role-field"]', 'none');
    await click('[data-test-top-bar="save-button"]');

    // Assert
    assert.dom('[data-test-application="toast"]').hasText('Roles saved');
  });
});
