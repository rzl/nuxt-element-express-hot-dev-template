'use strict';
//{ id:1, taskId:1, day: '2020-11-03', doneHour: 4, mark: '' }
module.exports = (sequelize, DataTypes) => {
  const TaskDoneHistory = sequelize.define('TaskDoneHistory', {
    day: DataTypes.STRING(10),
    doneHour: DataTypes.FLOAT,
    mark: DataTypes.TEXT,
  }, {});
  TaskDoneHistory.associate = function(models) {
    // associations can be defined here
    //    models.TaskDoneHistory.belongsTo(models.NewTask, { foreignKey: 'newTaskId'})
  };
  return TaskDoneHistory;
};
