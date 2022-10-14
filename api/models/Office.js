const {Model, DataTypes} = require("sequelize");
const sequelize = require("../config/db");


class Office extends Model {
  
}

Office.init(
  {
    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    paused: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    eliminated: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: "office",
  }
);


  module.exports = Office