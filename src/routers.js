const User = require('./api/User')

module.exports = router => {
  router
    .post('/api/users/signup', User.signUp)
    .post('/api/users/signin', User.signIn)
    .get('/api/users/logout', User.logout)
    .get('/api/users/current', User.getCurrentUser)
    .get('/api/users/all', User.findAll)
}
