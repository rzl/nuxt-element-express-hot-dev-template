var user = require('./user')
var index = require('./index')
var task = require('./task')

module.exports = function useRouter(app){
  app.use('/api', index)
  app.use('/api', user)
  app.use('/api/task', task)
};
