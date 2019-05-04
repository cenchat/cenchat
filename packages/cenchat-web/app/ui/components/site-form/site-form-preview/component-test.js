import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

import { setupTestState } from '@cenchat/shared/test-support';

module('Integration | Component | site-form/site-form-preview', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    setupTestState();

    this.set('brandColor', '#ffffff');
    this.set('theme', 'light');
  });

  test('should set style brand color', async function (assert) {
    assert.expect(1);

    // Act
    await render(hbs`{{site-form/site-form-preview brandColor=this.brandColor theme=this.theme}}`);

    // Assert
    const style = getComputedStyle(this.element.querySelector('.site-form-preview__card')).getPropertyValue('--brand-color');

    assert.equal(style, '#ffffff');
  });

  test('should set theme class', async function (assert) {
    assert.expect(1);

    // Act
    await render(hbs`{{site-form/site-form-preview brandColor=this.brandColor theme=this.theme}}`);

    // Assert
    assert.dom('[data-test-site-form-preview="host"]').hasClass('light');
  });
});
