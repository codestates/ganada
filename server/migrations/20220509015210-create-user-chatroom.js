"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("chatcontents", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      chats: {
        type: Sequelize.STRING,
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: "users",
          key: "id",
        },
        onDelete: "cascade",
        onUpdate: "cascade",
      },
      chatroomId: {
        type: Sequelize.INTEGER,
        references: {
          model: "chatrooms",
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
    await queryInterface.dropTable("chatcontents");
  },
};
