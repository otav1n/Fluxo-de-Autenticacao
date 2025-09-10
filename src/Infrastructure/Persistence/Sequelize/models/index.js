const sequelize = require("../database");
const { DataTypes } = require("sequelize");
const UserModel = require("./UserModel");

const models = {
  User: UserModel(sequelize, DataTypes),
};

Object.values(models).forEach((model) => {
  if (model.associate) {
    model.associate(models);
  }
});

module.exports = { sequelize, ...models };
