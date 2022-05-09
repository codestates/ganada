"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class boards extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // models.boards.hasMany(models.reservations);
      // models.boards.hasMany(models.chatRooms);
      // models.boards.belongsTo(models.users);
    }
  }
  boards.init(
    {
      category: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      title: DataTypes.STRING,
      image: DataTypes.STRING,
      description: DataTypes.STRING,
      tags: DataTypes.STRING,
      latitude: DataTypes.STRING,
      longitude: DataTypes.STRING,
      mainAddress: DataTypes.STRING,
      detailAddress: DataTypes.STRING,
      status: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: "users",
          key: "id",
        },
        onDelete: "cascade",
        onUpdate: "cascade",
      },
    },
    {
      sequelize,
      modelName: "boards",
    }
  );
  return boards;
};
