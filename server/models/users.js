"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // models.users.hasMany(models.reviews);
      // models.users.hasMany(models.chatContents);
      // models.users.hasMany(models.boards);
      // models.users.hasMany(models.chatRooms);
    }
  }
  users.init(
    {
      email: DataTypes.STRING,
      name: DataTypes.STRING,
      password: DataTypes.STRING,
      phoneNumber: DataTypes.STRING,
      image: DataTypes.STRING,
      kind: DataTypes.INTEGER,
      time: DataTypes.INTEGER,
      again: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "users",
      // tableName: "users",
    }
  );
  return users;
};
