const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/db");

class Survey extends Model {}

Survey.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    scheduledSend: {
      type: DataTypes.DATEONLY,
      defaultValue: null,
    },
    lastSend: {
      type: DataTypes.DATEONLY,
      defaultValue: null,
    },
    state: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    questionAndAnswer: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    isAnonymous: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },

  },
  {
    sequelize,
    modelName: "survey",
  }
);

module.exports = Survey;
