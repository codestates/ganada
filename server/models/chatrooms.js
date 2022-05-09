"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class chatrooms extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // models.chatRooms.hasMany(models.chatContents);
      // models.chatRooms.belongsTo(models.boards);
      // models.chatRooms.belongsTo(models.users);
    }
  }
  chatrooms.init(
    {
      userId: DataTypes.INTEGER,
      // cascade를 통해 user 삭제 시 채팅방 삭제
      boardId: DataTypes.INTEGER,
      // cascade를 통해 board 삭제 시 채팅방 삭제
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: "users",
          key: "id",
        },
        onDelete: "cascade",
      },
      receiverId: {
        type: DataTypes.INTEGER,
        references: {
          model: "users",
          key: "id",
        },
        onDelete: "cascade",
      },
      boardId: {
        type: DataTypes.INTEGER,
        references: {
          model: "boards",
          key: "id",
        },
        onDelete: "cascade",
      },
    },
    {
      sequelize,
      modelName: "chatrooms",
    }
  );
  return chatrooms;
};
