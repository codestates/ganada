"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.js")[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

const { boards, chatcontents, chatrooms, user_chatroom, users, user_boards } =
  sequelize.models;

// One to Many

// users 1 : N boards
users.hasMany(boards, { foreignKey: "userId" });
boards.belongsTo(users, { foreignKey: "userId" });

// users 1 : N chatcontents
users.hasMany(chatcontents, { foreignKey: "userId" });
chatcontents.belongsTo(users, { foreignKey: "userId" });

// chatrooms 1: N chatcontents
chatrooms.hasMany(chatcontents, { foreignKey: "chatroomId" });
chatcontents.belongsTo(chatrooms, { foreignKey: "chatroomId" });

// boards 1 : N chatrooms
boards.hasMany(chatrooms, { foreignKey: "boardId" });
chatrooms.belongsTo(boards, { foreignKey: "boardId" });

users.hasMany(user_chatroom, { foreignKey: "userId" });
user_chatroom.belongsTo(users, { foreignKey: "userId" });

users.hasMany(user_boards, { foreignKey: "userId" });
user_boards.belongsTo(users, { foreignKey: "userId" });

boards.hasMany(user_boards, { foreignKey: "boardId" });
user_boards.belongsTo(users, { foreignKey: "boardId" });

boards.hasMany(chatcontents, { foreignKey: "boardId" });
chatcontents.belongsTo(boards, { foreignKey: "boardId" });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.user_chatroom = require("./user_chatroom")(sequelize, Sequelize);
db.chatrooms = require("./chatrooms")(sequelize, Sequelize);
db.chatcontents = require("./chatcontents")(sequelize, Sequelize);

module.exports = db;
