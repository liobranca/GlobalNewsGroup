const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/db");

class List extends Model {}

List.init(
  {
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    paused: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: "list",
  }
);

module.exports = List;
