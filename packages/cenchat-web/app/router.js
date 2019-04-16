import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('sign-in');
  this.route('chats', function() {
    this.route('chat', { path: '/:chat_id' });
  });
  this.route('my-account', function() {
    this.route('update-info');
  });
});

export default Router;
