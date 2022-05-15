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
    }
  }
  chatrooms.init(
    {
      hostId: DataTypes.INTEGER,
      guestId: DataTypes.INTEGER,
      status: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      modelName: "chatrooms",
    }
  );
  return chatrooms;
};
