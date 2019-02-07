import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, fillIn, render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

import sinon from 'sinon';

module('Integration | Component | chat-composer', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    this.set('onSendMessageClick', () => {});
  });

  test('should enable send button when message field is not empty', async function (assert) {
    assert.expect(1);

    // Arrange
    await render(hbs`<ChatComposer @onSendMessageClick={{action this.onSendMessageClick}} />`);

    // Act
    await fillIn('[data-test-chat-composer="message-field"]', 'Foo');
    await click('[data-test-chat-composer="message-field"]');

    // Assert
    assert.dom('[data-test-chat-composer="send-message-button"]').isNotDisabled();
  });

  test('should disable send button when message field is empty', async function (assert) {
    assert.expect(1);

    // Arrange
    await render(hbs`<ChatComposer @onSendMessageClick={{action this.onSendMessageClick}} />`);

    // Act
    await click('[data-test-chat-composer="message-field"]');

    // Assert
    assert.dom('[data-test-chat-composer="send-message-button"]').isDisabled();
  });

  test('should fire an external action when clicking send button', async function (assert) {
    assert.expect(1);

    // Arrange
    const spy = sinon.spy(this, 'onSendMessageClick');

    await render(hbs`<ChatComposer @onSendMessageClick={{action this.onSendMessageClick}} />`);

    // Act
    await fillIn('[data-test-chat-composer="message-field"]', 'Foo');
    await click('[data-test-chat-composer="send-message-button"]');

    // Assert
    assert.ok(spy.calledWith('Foo'));
  });
});
