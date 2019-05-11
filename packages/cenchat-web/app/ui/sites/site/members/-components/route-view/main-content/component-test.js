import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

import { setupTestState } from '@cenchat/shared/test-support';

module('Integration | Component | sites/site/members/-components/route-view/main-content', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function () {
    setupTestState();

    const store = this.owner.lookup('service:store');
    const site = await store.findRecord('site', 'site_b');
    const admins = await site.get('admins');
    const moderators = await site.get('moderators');

    this.set('admins', admins);
    this.set('moderators', moderators);
    this.set('searchedUsers', []);
    this.set('onRoleChange', () => {});
    this.set('onSearchUserInput', () => {});
  });

  test('should show <SearchForm /> for admins', async function (assert) {
    assert.expect(1);

    // Act
    await render(hbs`
      {{sites/site/members/-components/route-view/main-content
        admins=this.admins
        moderators=this.moderators
        searchedUsers=this.searchedUsers
        onRoleChange=(action this.onRoleChange)
        onSearchUserInput=(action this.onSearchUserInput)
      }}
    `);

    // Assert
    assert.dom('[data-test-search-form="host"]').exists();
  });

  test('should show <MemberList /> for admins', async function (assert) {
    assert.expect(1);

    // Act
    await render(hbs`
      {{sites/site/members/-components/route-view/main-content
        admins=this.admins
        moderators=this.moderators
        searchedUsers=this.searchedUsers
        onRoleChange=(action this.onRoleChange)
        onSearchUserInput=(action this.onSearchUserInput)
      }}
    `);

    // Assert
    assert.dom('[data-test-main-content="admins"] [data-test-member-list="host"]').exists();
  });

  test('should show <MemberList /> for moderators when available', async function (assert) {
    assert.expect(1);

    // Act
    await render(hbs`
      {{sites/site/members/-components/route-view/main-content
        admins=this.admins
        moderators=this.moderators
        searchedUsers=this.searchedUsers
        onRoleChange=(action this.onRoleChange)
        onSearchUserInput=(action this.onSearchUserInput)
      }}
    `);

    // Assert
    assert.dom('[data-test-main-content="moderators"] [data-test-member-list="host"]').exists();
  });

  test('should hide <MemberList /> for moderators when unavailable', async function (assert) {
    assert.expect(1);

    // Arrange
    this.set('moderators', []);

    // Act
    await render(hbs`
      {{sites/site/members/-components/route-view/main-content
        admins=this.admins
        moderators=this.moderators
        searchedUsers=this.searchedUsers
        onRoleChange=(action this.onRoleChange)
        onSearchUserInput=(action this.onSearchUserInput)
      }}
    `);

    // Assert
    assert.dom('[data-test-main-content="moderators"] [data-test-member-list="host"]').doesNotExist();
  });
});
