'use strict';
module.exports = (sequelize, DataTypes) => {
  const DayWorkHour = sequelize.define('DayWorkHour', {
    day: DataTypes.STRING(10),
    mark: DataTypes.TEXT,
    workHour: DataTypes.FLOAT,
  }, {});
  DayWorkHour.associate = function(models) {
    // associations can be defined here
  };
  return DayWorkHour;
};
