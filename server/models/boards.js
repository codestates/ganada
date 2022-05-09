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
    }
  }
  boards.init(
    {
      category: DataTypes.INTEGER,
      title: DataTypes.STRING,
      image: DataTypes.STRING,
      description: DataTypes.STRING,
      tags: DataTypes.STRING,
      latitude: DataTypes.STRING,
      longitude: DataTypes.STRING,
      mainAddress: DataTypes.STRING,
      detailAddress: DataTypes.STRING,
      status: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
      // user 삭제 시 cascade를 통해 게시글 삭제
    },
    {
      sequelize,
      modelName: "boards",
    }
  );
  return boards;
};
