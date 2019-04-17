import { fillIn, render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

import { setupTestState } from '@cenchat/shared/test-support';
import sinon from 'sinon';

module('Integration | Component | my-account/update-info/-components/route-view/main-content/info-form', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function () {
    setupTestState();

    const store = this.owner.lookup('service:store');
    const user = await store.findRecord('user', 'user_a');

    this.set('user', user);
    this.set('onInfoUpdateEvent', () => {});
    this.set('onInfoFormSubmit', () => {});
  });

  test('should fire an external action when inputting name', async function (assert) {
    assert.expect(1);

    const spy = sinon.spy(this, 'onInfoUpdateEvent');

    // Act
    await render(hbs`
      {{my-account/update-info/-components/route-view/main-content/info-form user=this.user onInfoUpdateEvent=(action this.onInfoUpdateEvent) onInfoFormSubmit=(action this.onInfoFormSubmit)}}
    `);
    await fillIn('[data-test-info-form="display-name"] input', 'Foo Bar');

    // Assert
    assert.ok(spy.calledWith({ displayName: 'Foo Bar' }));
  });
});
