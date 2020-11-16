'use strict';
module.exports = (sequelize, DataTypes) => {
  const Holiday = sequelize.define('Holiday', {
    day: DataTypes.STRING(10),
    mark: DataTypes.TEXT,
  }, {});
  Holiday.associate = function(models) {
    // associations can be defined here
  };
  return Holiday;
};
