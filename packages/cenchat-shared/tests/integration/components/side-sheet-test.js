import { module, test } from 'qunit';
import { render } from '@ember/test-helpers';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | side-sheet', function (hooks) {
  setupRenderingTest(hooks);

  test('should show yield', async function (assert) {
    assert.expect(1);

    // Act
    await render(hbs`
      <SideSheet>
        <div data-test-side-sheet="yield"></div>
      </SideSheet>
    `);

    // Assert
    assert.dom('[data-test-side-sheet="yield"]').exists();
  });
});
