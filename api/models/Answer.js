const {Model, DataTypes} = require("sequelize");
const sequelize = require("../config/db");


class Answer extends Model {
  
}

Answer.init(
    {
        description:{
            type:DataTypes.TEXT,
            allowNull:false,
        },
     


    },
    {
      sequelize,
      modelName: "answer",
    }
  );


  module.exports = Answer