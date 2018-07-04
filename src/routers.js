const User = require('./api/User')
const Category = require('./api/Category')
const Post = require('./api/Post')

module.exports = (app, router) => {
  router
    // api
    .post('/api/users/signup', User.signUp)
    .post('/api/users/signin', User.signIn)
    .get('/api/users/logout', User.logout)
    .get('/api/users/current', User.getCurrentUser)
    .get('/api/users/all', User.findAll)

    .get('/api/categories', Category.findAll)
    .post('/api/categories', Category.add)
    .put('/api/categories', Category.update)
    .delete('/api/categories', Category.remove)

    .get('/api/posts/:id', Post.findById)
    .get('/api/posts', Post.findAll)
    .post('/api/posts', Post.add)
    .put('/api/posts', Post.update)
    .put('/api/posts/content', Post.updateContent)
    .delete('/api/posts', Post.remove)

    // 页面
    .get('/admin/editor/:id', async ctx => {
      const id = ctx.params.id
      await app.render(ctx.req, ctx.res, '/admin/editor', { id })
      ctx.respond = false
    })
    .get('/posts/:id', async ctx => {
      const id = ctx.params.id
      await app.render(ctx.req, ctx.res, '/post', { id })
      ctx.respond = false
    })
    .get('/category/:category', async ctx => {
      const category = ctx.params.category
      await app.render(ctx.req, ctx.res, '/category', { category })
      ctx.respond = false
    })
}
