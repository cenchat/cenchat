import { fillIn, render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

import { setupTestState } from '@cenchat/shared/test-support';
import sinon from 'sinon';

module('Integration | Component | sites/site/members/-components/route-view/main-content/search-form', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function () {
    setupTestState();

    const store = this.owner.lookup('service:store');
    const searchedUsers = await store.findAll('user');

    this.set('searchedUsers', searchedUsers);
    this.set('onRoleChange', () => {});
    this.set('onSearchUserInput', () => {});
  });

  test('should list the searched users', async function (assert) {
    assert.expect(1);

    // Act
    await render(hbs`
      {{sites/site/members/-components/route-view/main-content/search-form
        searchedUsers=this.searchedUsers
        onRoleChange=(action this.onRoleChange)
        onSearchUserInput=(action this.onSearchUserInput)
      }}
    `);

    // Assert
    assert.dom('[data-test-member-list-item="host"]').exists({ count: 4 });
  });

  test('should fire an external action when inputting on the search field', async function (assert) {
    assert.expect(1);

    // Arrange
    const spy = sinon.spy(this, 'onSearchUserInput');

    // Act
    await render(hbs`
      {{sites/site/members/-components/route-view/main-content/search-form
        searchedUsers=this.searchedUsers
        onRoleChange=(action this.onRoleChange)
        onSearchUserInput=(action this.onSearchUserInput)
      }}
    `);
    await fillIn('[data-test-search-form="user"] input', 'user_a');

    // Assert
    assert.ok(spy.calledWith('user_a'));
  });
});
