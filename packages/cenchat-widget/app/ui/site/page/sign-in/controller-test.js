import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import EmberObject from '@ember/object';

import sinon from 'sinon';

module('Unit | Controller | site/page/sign-in', function (hooks) {
  setupTest(hooks);

  test('should build redirectUrl property based on the page model', function (assert) {
    assert.expect(1);

    // Arrange
    const controller = this.owner.lookup('controller:site/page/sign-in');

    controller.set('model', EmberObject.create({
      site: { hostname: 'site_a.com' },
      slug: '%2Ffoo%2Fbar',
    }));

    // Act
    const result = controller.redirectUrl;

    // Assert
    assert.equal(result, 'http://site_a.com/foo/bar');
  });

  test('should transition to site.page.chats when handling after sign in event', function (assert) {
    assert.expect(1);

    // Arrange
    const controller = this.owner.lookup('controller:site/page/sign-in');
    const stub = sinon.stub(controller, 'transitionToRoute');

    // Act
    controller.handleAfterSignInEvent();

    // Assert
    assert.ok(stub.calledWithExactly('site.page.chats'));
  });
});
