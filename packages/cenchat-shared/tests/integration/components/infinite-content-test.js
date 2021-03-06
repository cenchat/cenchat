import { module, test } from 'qunit';
import { render } from '@ember/test-helpers';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | infinite-content', function (hooks) {
  setupRenderingTest(hooks);

  test('should show yield', async function (assert) {
    assert.expect(1);

    // Act
    await render(hbs`
      <InfiniteContent>
        <div data-test-infinite-content="yield"></div>
      </InfiniteContent>
    `);

    // Assert
    assert.dom('[data-test-infinite-content="yield"]').exists();
  });
});
