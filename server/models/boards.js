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
      models.boards.hasMany(models.reservations);
      models.boards.hasMany(models.chatRooms);
      models.boards.belongsTo(models.Users);
    }
  }
  boards.init(
    {
      category: DataTypes.INTEGER,
      title: DataTypes.STRING,
      image: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      description: DataTypes.STRING,
      tags: DataTypes.STRING,
      latitude: DataTypes.STRING,
      longitude: DataTypes.STRING,
      mainAddress: DataTypes.STRING,
      detailAddress: DataTypes.STRING,
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
        onDelete: "cascade",
      },
    },
    {
      sequelize,
      modelName: "boards",
      charset: "utf8mb4",
      collate: "utf8mb4_general_ci",
      sequelize,
    }
  );
  return boards;
};
