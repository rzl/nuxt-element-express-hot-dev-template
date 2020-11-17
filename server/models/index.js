'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';

const config = require(__dirname + '/../config/config.json')[env];
const db = {};
console.log(config)
var table = {
  department: require('./department'),
  okr: require('./okr'),
  permission: require('./permission'),
  role: require('./role'),
  user: require('./user'),
  holiday: require('./holiday'),
  workday: require('./workday'),
  dayWorkHour: require('./dayWorkHour'),
  config: require('./config'),
  newTask: require('./newTask'),
  taskDoneHistory: require('./taskDoneHistory'),
  /*permissionRole: require('./permissionRole')*/
}

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

Object.keys(table).forEach((tn) => {
  let defineCall = table[tn]
  if (typeof defineCall === 'object') {
    // ES6 module compatibility
    defineCall = defineCall.default;
  }
  var model = sequelize.importCache[tn] = defineCall(sequelize, Sequelize.DataTypes);
  db[model.name] = model;
  console.log(model.name)
})

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
