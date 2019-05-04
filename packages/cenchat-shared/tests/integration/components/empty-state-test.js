import { module, test } from 'qunit';
import { render } from '@ember/test-helpers';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | empty-state', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    this.set('title', 'Title');
    this.set('subtitle', 'Subtitle');
    this.set('description', 'Description');
  });

  test('should show title', async function (assert) {
    assert.expect(1);

    // Act
    await render(hbs`<EmptyState @title={{this.title}} @subtitle={{this.subtitle}} @description={{this.description}} />`);

    // Assert
    assert.dom('[data-test-empty-state="title"]').hasText('Title');
  });

  test('should show subtitle if available', async function (assert) {
    assert.expect(1);

    // Act
    await render(hbs`<EmptyState @title={{this.title}} @subtitle={{this.subtitle}} @description={{this.description}} />`);

    // Assert
    assert.dom('[data-test-empty-state="subtitle"]').hasText('Subtitle');
  });

  test('should hide subtitle if unavailable', async function (assert) {
    assert.expect(1);

    // Arrange
    this.set('subtitle', null);

    // Act
    await render(hbs`<EmptyState @title={{this.title}} @subtitle={{this.subtitle}} @description={{this.description}} />`);

    // Assert
    assert.dom('[data-test-empty-state="subtitle"]').doesNotExist();
  });

  test('should show description if available', async function (assert) {
    assert.expect(1);

    // Act
    await render(hbs`<EmptyState @title={{this.title}} @subtitle={{this.subtitle}} @description={{this.description}} />`);

    // Assert
    assert.dom('[data-test-empty-state="description"]').hasText('Description');
  });

  test('should hide description if unavailable', async function (assert) {
    assert.expect(1);

    // Arrange
    this.set('description', null);

    // Act
    await render(hbs`<EmptyState @title={{this.title}} @subtitle={{this.subtitle}} @description={{this.description}} />`);

    // Assert
    assert.dom('[data-test-empty-state="description"]').doesNotExist();
  });
});
