import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

import { setupTestState } from '@cenchat/shared/test-support';

module('Integration | Component | sites/site/members/-components/route-view', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function () {
    setupTestState();

    const store = this.owner.lookup('service:store');
    const site = await store.findRecord('site', 'site_b');
    const admins = await site.get('admins');
    const moderators = await site.get('moderators');

    this.set('admins', admins);
    this.set('moderators', moderators);
    this.set('pendingRoleChange', { admin: [], moderator: [], none: [] });
    this.set('searchedUsers', []);
    this.set('onRoleChange', () => {});
    this.set('onSearchUserInput', () => {});
    this.set('onSaveRolesClick', () => {});
  });

  test('should show <TopBar />', async function (assert) {
    assert.expect(1);

    // Act
    await render(hbs`
      {{sites/site/members/-components/route-view
        admins=this.admins
        moderators=this.moderators
        pendingRoleChange=this.pendingRoleChange
        searchedUsers=this.searchedUsers
        onRoleChange=(fn this.onRoleChange)
        onSearchUserInput=(fn this.onSearchUserInput)
        onSaveRolesClick=(fn this.onSaveRolesClick)
      }}
    `);

    // Assert
    assert.dom('[data-test-top-bar="host"]').exists();
  });

  test('should show <MainContent />', async function (assert) {
    assert.expect(1);

    // Act
    await render(hbs`
      {{sites/site/members/-components/route-view
        admins=this.admins
        moderators=this.moderators
        pendingRoleChange=this.pendingRoleChange
        searchedUsers=this.searchedUsers
        onRoleChange=(fn this.onRoleChange)
        onSearchUserInput=(fn this.onSearchUserInput)
        onSaveRolesClick=(fn this.onSaveRolesClick)
      }}
    `);

    // Assert
    assert.dom('[data-test-main-content="host"]').exists();
  });
});
