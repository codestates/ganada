"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class reservations extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.reservations.belongsTo(models.boards);
    }
  }
  reservations.init(
    {
      status: DataTypes.INTEGER,
      boardId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "reservations",
    }
  );
  return reservations;
};
