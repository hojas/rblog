const User = require('./api/User')
const Category = require('./api/Category')
const Post = require('./api/Post')

module.exports = router => {
  router
    .post('/api/users/signup', User.signUp)
    .post('/api/users/signin', User.signIn)
    .get('/api/users/logout', User.logout)
    .get('/api/users/current', User.getCurrentUser)
    .get('/api/users/all', User.findAll)

    .get('/api/categories', Category.findAll)
    .post('/api/categories', Category.add)
    .put('/api/categories', Category.update)
    .delete('/api/categories', Category.remove)

    .get('/api/posts', Post.findAll)
    .post('/api/posts', Post.add)
    .put('/api/posts', Post.update)
    .delete('/api/posts', Post.remove)
}
