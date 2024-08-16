'use strict';

const {
  Model,
  UUIDV4
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tokens extends Model {
   
    static associate(models) {
      // define association here
    }
  }
  Tokens.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, 
    },
    token_type: {
      type: DataTypes.ENUM('ACCESS', 'RESET'),
      allowNull: false,
    },
    expiresAt: {
      type: DataTypes.DATE, 
    },
    userId: {
      type:DataTypes.UUID,
      references: {
        model: 'Users',
        key: 'id',
      }
    }
  }, {
    sequelize,
    modelName: 'Tokens',
    paranoid: true,
    timestamps: true,
  });
  return Tokens;
};