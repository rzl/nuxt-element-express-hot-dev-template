'use strict';
//        { id: 10, name: 'asd', workHour: 10, doneHour: 0, taskDoneHistory: [] },
module.exports = (sequelize, DataTypes) => {
  const NewTask = sequelize.define('NewTask', {
    name: DataTypes.TEXT,
    workHour: DataTypes.FLOAT(2),
    doneHour: DataTypes.FLOAT(2)
  }, {});
  NewTask.associate = function(models) {
    // associations can be defined here
    models.NewTask.hasMany(models.TaskDoneHistory, { as: 'taskDoneHistory' })
  };
  return NewTask;
};
