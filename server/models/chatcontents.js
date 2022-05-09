"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class chatContents extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.chatContents.belongsTo(models.users);
      models.chatContents.belongsTo(models.chatRooms);
    }
  }
  chatContents.init(
    {
      chats: DataTypes.STRING,
      userId: DataTypes.INTEGER,
      roomId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "chatContents",
    }
  );
  return chatContents;
};
