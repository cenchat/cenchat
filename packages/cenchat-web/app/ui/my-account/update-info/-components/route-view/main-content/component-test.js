import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

import { setupTestState } from '@cenchat/shared/test-support';

module('Integration | Component | my-account/update-info/-components/route-view/main-content', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function () {
    setupTestState();

    const store = this.owner.lookup('service:store');
    const user = await store.findRecord('user', 'user_a');

    this.set('user', user);
    this.set('onInfoUpdateEvent', () => {});
    this.set('onInfoFormSubmit', () => {});
  });

  test('should show <InfoForm />', async function (assert) {
    assert.expect(1);

    // Act
    await render(hbs`
      {{my-account/update-info/-components/route-view/main-content user=this.user onInfoUpdateEvent=(action this.onInfoUpdateEvent) onInfoFormSubmit=(action this.onInfoFormSubmit)}}
    `);

    // Assert
    assert.dom('[data-test-info-form="host"]').exists();
  });
});
