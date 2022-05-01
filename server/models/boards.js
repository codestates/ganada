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
      models.boards.hasMany(models.reservations);
      models.boards.hasMany(models.chatRooms);
      models.boards.belongsTo(models.users);
    }
  }
  boards.init(
    {
      category: DataTypes.INTEGER,
      title: DataTypes.STRING,
      image: DataTypes.STRING,
      description: DataTypes.STRING,
      modelTag: DataTypes.STRING,
      photographerTag: DataTypes.STRING,
      sex: DataTypes.STRING,
      age: DataTypes.STRING,
      height: DataTypes.STRING,
      weight: DataTypes.STRING,
      latitude: DataTypes.STRING,
      longitude: DataTypes.STRING,
      detailAddress: DataTypes.STRING,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "boards",
    }
  );
  return boards;
};
