import { fillIn, render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

import { setupTestState } from '@cenchat/shared/test-support';
import sinon from 'sinon';

module('Integration | Component | site-form', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function () {
    setupTestState();

    const store = this.owner.lookup('service:store');
    const site = await store.findRecord('site', 'site_a');

    this.set('site', site);
    this.set('onSiteUpdateEvent', () => {});
    this.set('onSiteFormSubmit', () => {});
  });

  test('should show site info in their respective fields', async function (assert) {
    assert.expect(4);

    // Act
    await render(hbs`
      {{site-form
        site=this.site
        onSiteUpdateEvent=(fn this.onSiteUpdateEvent)
        onSiteFormSubmit=(fn this.onSiteFormSubmit)
      }}
    `);

    // Assert
    assert.dom('[data-test-site-form="hostname"] input').hasValue('site-a.com');
    assert.dom('[data-test-site-form="name"] input').hasValue('Site A');
    assert.dom('[data-test-site-form="brand-color"] input').hasValue('#212121');
    assert.dom('[data-test-site-form="theme"] select').hasValue('light');
  });

  test('should show <SiteFormPreview />', async function (assert) {
    assert.expect(1);

    // Act
    await render(hbs`
      {{site-form
        site=this.site
        onSiteUpdateEvent=(fn this.onSiteUpdateEvent)
        onSiteFormSubmit=(fn this.onSiteFormSubmit)
      }}
    `);

    // Assert
    assert.dom('[data-test-site-form-preview="host"]').exists();
  });

  test('should fire external action when inputting hostname', async function (assert) {
    assert.expect(1);

    // Arrange
    const spy = sinon.spy(this, 'onSiteUpdateEvent');

    // Act
    await render(hbs`
      {{site-form
        site=this.site
        onSiteUpdateEvent=(fn this.onSiteUpdateEvent)
        onSiteFormSubmit=(fn this.onSiteFormSubmit)
      }}
    `);
    await fillIn('[data-test-site-form="hostname"] input', 'site-100.com');

    // Assert
    assert.ok(spy.calledWith({ hostname: 'site-100.com' }));
  });

  test('should fire external action when inputting name', async function (assert) {
    assert.expect(1);

    // Arrange
    const spy = sinon.spy(this, 'onSiteUpdateEvent');

    // Act
    await render(hbs`
      {{site-form
        site=this.site
        onSiteUpdateEvent=(fn this.onSiteUpdateEvent)
        onSiteFormSubmit=(fn this.onSiteFormSubmit)
      }}
    `);
    await fillIn('[data-test-site-form="name"] input', 'Site 100');

    // Assert
    assert.ok(spy.calledWith({ displayName: 'Site 100' }));
  });

  test('should fire external action when inputting brand color', async function (assert) {
    assert.expect(1);

    // Arrange
    const spy = sinon.spy(this, 'onSiteUpdateEvent');

    // Act
    await render(hbs`
      {{site-form
        site=this.site
        onSiteUpdateEvent=(fn this.onSiteUpdateEvent)
        onSiteFormSubmit=(fn this.onSiteFormSubmit)
      }}
    `);
    await fillIn('[data-test-site-form="brand-color"] input', '#ffffff');

    // Assert
    assert.ok(spy.calledWith({ brandColor: '#ffffff' }));
  });

  test('should fire external action when inputting theme', async function (assert) {
    assert.expect(1);

    // Arrange
    const spy = sinon.spy(this, 'onSiteUpdateEvent');

    // Act
    await render(hbs`
      {{site-form
        site=this.site
        onSiteUpdateEvent=(fn this.onSiteUpdateEvent)
        onSiteFormSubmit=(fn this.onSiteFormSubmit)
      }}
    `);
    await fillIn('[data-test-site-form="theme"] select', 'dark');

    // Assert
    assert.ok(spy.calledWith({ theme: 'dark' }));
  });
});
