"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class user_boards extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  user_boards.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: "users",
          key: "id",
        },
        onDelete: "cascade",
        onUpdate: "cascade",
      },
      boardId: {
        type: DataTypes.INTEGER,
        references: {
          model: "boards",
          key: "id",
        },
        onDelete: "cascade",
        onUpdate: "cascade",
      },
    },
    {
      sequelize,
      modelName: "user_boards",
    }
  );
  return user_boards;
};
