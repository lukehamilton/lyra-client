const routes = require('next-routes');

module.exports = routes()
  .add({ name: 'index', pattern: '/', page: 'index' })
  .add('trending', '/trending', 'index')
  .add('new-post', '/posts/new', '/posts/new')
  .add('new-post-submission', '/posts/new/submission', '/posts/new')
  .add('show-post', '/posts/:slug', '/posts/show')
  .add('show-user', '/@:slug', '/users/show')
  .add('about', '/about-us/:foo(bar|baz)');
