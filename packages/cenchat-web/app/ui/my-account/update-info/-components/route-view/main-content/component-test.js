import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | my-account/update-info/-components/route-view/main-content', function (hooks) {
  setupRenderingTest(hooks);

  test('should show <InfoForm />', async function (assert) {
    assert.expect(1);

    // Arrange
    this.set('info', { displayName: null });
    this.set('onInfoUpdateEvent', () => {});
    this.set('onInfoFormSubmit', () => {});

    // Act
    await render(hbs`
      {{my-account/update-info/-components/route-view/main-content info=this.info onInfoUpdateEvent=(action this.onInfoUpdateEvent) onInfoFormSubmit=(action this.onInfoFormSubmit)}}
    `);

    // Assert
    assert.dom('[data-test-info-form="host"]').exists();
  });
});
