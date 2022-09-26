'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Attendance extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Attendance.belongsTo(models.User, {foreignKey: 'userId', as: 'Attendance', onDelete: 'CASCADE', hook: true});
      Attendance.belongsTo(models.Event, {foreignKey: 'eventId', onDelete: 'CASCADE', hook: true});
    }
  }
  Attendance.init({
    eventId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    status: {
      type: DataTypes.ENUM,
      values: ['Active', 'Inactive']
    }
  }, {
    sequelize,
    modelName: 'Attendance',
  });
  return Attendance;
};
