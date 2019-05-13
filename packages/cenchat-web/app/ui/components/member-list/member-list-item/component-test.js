import { fillIn, render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

import { setupTestState } from '@cenchat/shared/test-support';
import sinon from 'sinon';

module('Integration | Component | member-list/member-list-item', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function () {
    setupTestState();

    const store = this.owner.lookup('service:store');
    const member = await store.findRecord('user', 'user_a');

    this.set('member', member);
    this.set('onRoleChange', () => {});
  });

  test('should member info', async function (assert) {
    assert.expect(1);

    // Act
    await render(hbs`
      {{member-list/member-list-item
        member=this.member
        onRoleChange=(action this.onRoleChange this.member)
      }}
    `);

    // Assert
    assert.dom('[data-test-member-list-item="display-username"]').hasText('user_a');
  });

  test('should fire an external action when changing role', async function (assert) {
    assert.expect(1);

    // Arrange
    const spy = sinon.spy(this, 'onRoleChange');

    // Act
    await render(hbs`
      {{member-list/member-list-item
        member=this.member
        onRoleChange=(action this.onRoleChange this.member)
      }}
    `);
    await fillIn('[data-test-member-list-item="role-field"]', 'moderators');

    // Assert
    assert.ok(spy.calledWith(this.member, 'moderators'));
  });
});
