const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/db");

class Client extends Model {}

Client.init(
  {
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    company: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    area: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      validate: { isEmail: true },
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize,
    modelName: "client",
  }
);

module.exports = Client;
