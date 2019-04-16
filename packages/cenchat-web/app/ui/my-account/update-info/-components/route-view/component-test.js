import { click, fillIn, render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

import { setupTestState } from '@cenchat/shared/test-support';
import sinon from 'sinon';

module('Integration | Component | my-account/update-info/-components/route-view', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    setupTestState();

    this.set('info', { displayName: null });
    this.set('onInfoUpdateEvent', () => {});
    this.set('onInfoFormSubmit', () => {});
  });

  test('should show <MainContent />', async function (assert) {
    assert.expect(1);

    // Act
    await render(hbs`
      {{my-account/update-info/-components/route-view info=this.info onInfoUpdateEvent=(action this.onInfoUpdateEvent) onInfoFormSubmit=(action this.onInfoFormSubmit)}}
    `);

    // Assert
    assert.dom('[data-test-main-content="host"]').exists();
  });

  test('should fire an external action when submitting info form', async function (assert) {
    assert.expect(1);

    // Arrange
    const spy = sinon.spy(this, 'onInfoFormSubmit');

    // Act
    await render(hbs`
      {{my-account/update-info/-components/route-view info=this.info onInfoUpdateEvent=(action this.onInfoUpdateEvent) onInfoFormSubmit=(action this.onInfoFormSubmit)}}
    `);
    await fillIn('[data-test-info-form="display-name"] input', 'Foo Bar');
    await click('[data-test-route-view="save-info-button"]');

    // Assert
    assert.ok(spy.calledOnce);
  });
});
