"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class chatRooms extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.chatRooms.hasMany(models.chatContents);
      models.chatRooms.belongsTo(models.boards);
      models.chatRooms.belongsTo(models.Users);
    }
  }
  chatRooms.init(
    {
      senderId: DataTypes.INTEGER,
      receiverId: DataTypes.INTEGER,
      boardId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "chatRooms",
    }
  );
  return chatRooms;
};
