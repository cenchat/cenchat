import { click, render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

import { setupTestState } from '@cenchat/shared/test-support';
import sinon from 'sinon';

module('Integration | Component | sites/site/members/-components/route-view/top-bar', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    setupTestState();

    this.set('pendingRoleChange', { admin: [], moderator: [], none: [] });
    this.set('onSaveRolesClick', () => {});
  });

  test('should enable save button when there are pending member changes', async function (assert) {
    assert.expect(1);

    // Arrange
    this.set('pendingRoleChange', {
      admin: ['user_a'],
      moderator: [],
      none: [],
    });

    // Act
    await render(hbs`
      {{sites/site/members/-components/route-view/top-bar
        pendingRoleChange=this.pendingRoleChange
        onSaveRolesClick=(fn this.onSaveRolesClick)
      }}
    `);

    // Assert
    assert.dom('[data-test-top-bar="save-button"]').isNotDisabled();
  });

  test('should disable save button when there are no pending member changes', async function (assert) {
    assert.expect(1);

    // Act
    await render(hbs`
      {{sites/site/members/-components/route-view/top-bar
        pendingRoleChange=this.pendingRoleChange
        onSaveRolesClick=(fn this.onSaveRolesClick)
      }}
    `);

    // Assert
    assert.dom('[data-test-top-bar="save-button"]').isDisabled();
  });

  test('should fire an external action when clicking save', async function (assert) {
    assert.expect(1);

    // Arrange
    this.set('pendingRoleChange', {
      admin: ['user_a'],
      moderator: [],
      none: [],
    });

    const spy = sinon.spy(this, 'onSaveRolesClick');

    // Act
    await render(hbs`
      {{sites/site/members/-components/route-view/top-bar
        pendingRoleChange=this.pendingRoleChange
        onSaveRolesClick=(fn this.onSaveRolesClick)
      }}
    `);
    await click('[data-test-top-bar="save-button"]');

    // Assert
    assert.ok(spy.calledOnce);
  });
});
