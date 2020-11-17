var models = require('../models');
var utils = require('../utils')
const { Op } = require("sequelize");

function BaseService() {
  this.model = ''
  this.models = models
  this.dbOp = Op
  this.utils = utils
  this.add = function add(opt) {
    if (this.model === '') { throw new Error('未设置model') }
    return this.model.create(opt)
  }
  this.update = function update(opt) {
    if (this.model === '') { throw new Error('未设置model') }
    return this.model.update(opt.data, { where: { id: opt.id } })
  }
  this.getList = function getList(opt) {
    if (this.model === '') { throw new Error('未设置model') }
    return this.model.findAll(opt)
  }
  this.deleteAll = function deleteAll(opt) {
    if (this.model === '') { throw new Error('未设置model') }
    return this.model.destroy({
      where: {}
    })
  }
  this.deleteById = function deleteById(opt) {
    if (this.model === '') { throw new Error('未设置model') }
    return this.model.destroy({
      where: {id: opt.id}
    })
  }
}
module.exports = BaseService
