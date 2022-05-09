"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("user_chatrooms", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.INTEGER,
<<<<<<< HEAD:server/migrations/20220509015210-create-user-chatroom.js
=======
        // references: {
        //   model: "Users",
        //   key: "id",
        // },
        // onDelete: "cascade",
        // onUpdate: "cascade",
>>>>>>> remotes/origin/feature/2-modify:server/migrations/20220503144324-create-chat-rooms.js
      },
      chatroomId: {
        type: Sequelize.INTEGER,
<<<<<<< HEAD:server/migrations/20220509015210-create-user-chatroom.js
=======
        // references: {
        //   model: "Users",
        //   key: "id",
        // },
        // onDelete: "cascade",
        // onUpdate: "cascade",
>>>>>>> remotes/origin/feature/2-modify:server/migrations/20220503144324-create-chat-rooms.js
      },
      boardId: {
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable("user_chatrooms");
  },
};
