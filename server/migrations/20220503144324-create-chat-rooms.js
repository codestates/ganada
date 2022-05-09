"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("chatRooms", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.INTEGER,
        // references: {
        //   model: "Users",
        //   key: "id",
        // },
        // onDelete: "cascade",
        // onUpdate: "cascade",
      },
      receiverId: {
        type: Sequelize.INTEGER,
        // references: {
        //   model: "Users",
        //   key: "id",
        // },
        // onDelete: "cascade",
        // onUpdate: "cascade",
      },
      boardId: {
        type: Sequelize.INTEGER,
        references: {
          model: "boards",
          key: "id",
        },
        onDelete: "cascade",
        onUpdate: "cascade",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("chatRooms");
  },
};
