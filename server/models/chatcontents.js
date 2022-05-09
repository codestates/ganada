"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class chatcontents extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  chatcontents.init(
    {
      chats: DataTypes.STRING,
      userId: DataTypes.INTEGER,
      // cascade를 통해 user 삭제 시 채팅방 기록 삭제
      chatroomId: DataTypes.INTEGER,
      // cascade를 통해 채팅방 삭제 시 기록 삭제
    },
    {
      sequelize,
      modelName: "chatcontents",
    }
  );
  return chatcontents;
};
