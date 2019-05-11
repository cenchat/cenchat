import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

import { setupTestState } from '@cenchat/shared/test-support';

module('Integration | Component | member-list', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function () {
    setupTestState();

    const store = this.owner.lookup('service:store');
    const site = await store.findRecord('site', 'site_a');
    const admins = await site.get('admins');

    this.set('members', admins);
    this.set('onRoleChange', () => {});
  });

  test('should show <MemberListItem /> per every member', async function (assert) {
    assert.expect(1);

    // Act
    await render(hbs`{{member-list members=this.members onRoleChange=(action this.onRoleChange)}}`);

    // Assert
    assert.dom('[data-test-member-list-item="host"]').exists();
  });
});
