import { fillIn, render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

import { setupTestState } from '@cenchat/shared/test-support';
import sinon from 'sinon';

module('Integration | Component | my-account/update/-components/route-view/main-content/profile-form', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function () {
    setupTestState();

    const store = this.owner.lookup('service:store');
    const user = await store.findRecord('user', 'user_a');

    this.set('user', user);
    this.set('onProfileUpdateEvent', () => {});
    this.set('onProfileFormSubmit', () => {});
  });

  test('should fire an external action when inputting name', async function (assert) {
    assert.expect(1);

    const spy = sinon.spy(this, 'onProfileUpdateEvent');

    // Act
    await render(hbs`
      {{my-account/update/-components/route-view/main-content/profile-form user=this.user onProfileUpdateEvent=(fn this.onProfileUpdateEvent) onProfileFormSubmit=(fn this.onProfileFormSubmit)}}
    `);
    await fillIn('[data-test-profile-form="display-username"] input', 'foobar');

    // Assert
    assert.ok(spy.calledWith({ displayUsername: 'foobar' }));
  });
});
