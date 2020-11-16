var models = require('../models');
var utils = require('../utils')
const { Op } = require("sequelize");
function BaseService() {
  this.db = models
  this.dbOp = Op
  this.utils = utils
}
module.exports = BaseService
