'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Event.hasMany(models.Attendance, {foreignKey: "eventId", onDelete: "CASCADE", hooks: true});
      Event.hasMany(models.EventImage, {foreignKey: "eventId", onDelete: "CASCADE", hooks: true});
      Event.belongsTo(models.Venue, {foreignKey: 'venueId'});
      Event.belongsTo(models.Group, {foreignKey: "groupId"})
    }
  }
  Event.init({
    venueId: DataTypes.INTEGER,
    groupId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    type: {
      type: DataTypes.ENUM,
      values: ["Online", "In-Person"]
    },
    capacity: DataTypes.INTEGER,
    price: DataTypes.DECIMAL,
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Event',
  });
  return Event;
};
