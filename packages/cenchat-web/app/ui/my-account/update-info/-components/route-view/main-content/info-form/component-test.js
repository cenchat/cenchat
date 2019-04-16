import { fillIn, render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

import sinon from 'sinon';

module('Integration | Component | my-account/update-info/-components/route-view/main-content/info-form', function (hooks) {
  setupRenderingTest(hooks);

  test('should fire an external action when inputting name', async function (assert) {
    assert.expect(1);

    // Arrange
    this.set('info', { displayName: null });
    this.set('onInfoUpdateEvent', () => {});
    this.set('onInfoFormSubmit', () => {});

    const spy = sinon.spy(this, 'onInfoUpdateEvent');

    // Act
    await render(hbs`
      {{my-account/update-info/-components/route-view/main-content/info-form info=this.info onInfoUpdateEvent=(action this.onInfoUpdateEvent) onInfoFormSubmit=(action this.onInfoFormSubmit)}}
    `);
    await fillIn('[data-test-info-form="display-name"] input', 'Foo Bar');

    // Assert
    assert.ok(spy.calledWith({ displayName: 'Foo Bar' }));
  });
});
