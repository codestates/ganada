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
<<<<<<< HEAD
        references: {
          model: "users",
          key: "id",
        },
      },
      chatroomId: {
        type: Sequelize.INTEGER,
        references: {
          model: "chatrooms",
          key: "id",
        },
=======
        // references: {
        //   model: "Users",
        //   key: "id",
        // },
        // onDelete: "cascade",
        // onUpdate: "cascade",
      },
      chatroomId: {
        type: Sequelize.INTEGER,
        // references: {
        //   model: "Users",
        //   key: "id",
        // },
        // onDelete: "cascade",
        // onUpdate: "cascade",
>>>>>>> remotes/origin/feature/6-chat
      },
      boardId: {
        type: Sequelize.INTEGER,
        references: {
          model: "boards",
          key: "id",
        },
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
