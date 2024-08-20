'use strict';
const {
  Model,
  UUIDV4
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Invites extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Invites.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
    },
    eventId: {
      type: DataTypes.UUID,
      references: {
        model: 'Events',
        key: 'id',
      },
      allowNull: false
    },
    userId:{
      type: DataTypes.UUID,
      references: {
        model: 'Users',
        key: 'id',
      },
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'Invites',
    paranoid: true,
    timestamps: true,
  });
  return Invites;
};