'use strict';
module.exports = (sequelize, DataTypes) => {
  const Workday = sequelize.define('Workday', {
    day: DataTypes.STRING(10),
    mark: DataTypes.TEXT,
  }, {});
  Workday.associate = function(models) {
    // associations can be defined here
  };
  return Workday;
};
