const User = require('./api/User')
const Category = require('./api/Category')

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
}
