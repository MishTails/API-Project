'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Membership extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Membership.belongsTo(models.User, {foreignKey: "userId", onDelete: "CASCADE", hooks: true});
      Membership.belongsTo(models.Group, {foreignKey: "groupId", onDelete: "CASCADE", hooks: true})
    }
  }
  Membership.init({
    userId: { type: DataTypes.INTEGER},
    groupId:{ type: DataTypes.INTEGER},
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Membership',
  });
  return Membership;
};