import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('site', { path: '/sites/:site_id' }, function() {
    this.route('page', { path: '/pages/:page_postfix_id' }, function() {
      this.route('chats', function() {
        this.route('new');
        this.route('chat', { path: '/:chat_id' });
      });
      this.route('sign-in');
      this.route('my-account', function() {});
    });

    this.route('pages', function() {});
  });
  this.route('sign-in');
  this.route('error');
});

export default Router;
