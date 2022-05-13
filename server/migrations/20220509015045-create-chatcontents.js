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
<<<<<<< HEAD
=======
        onUpdate: "cascade",
>>>>>>> remotes/origin/dev41
      },
      chatroomId: {
        type: Sequelize.INTEGER,
        references: {
          model: "chatrooms",
          key: "id",
        },
        onDelete: "cascade",
<<<<<<< HEAD
=======
        onUpdate: "cascade",
>>>>>>> remotes/origin/dev41
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
