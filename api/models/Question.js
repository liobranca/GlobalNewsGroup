const {Model, DataTypes} = require("sequelize");
const sequelize = require("../config/db");


class Question extends Model {
  
}

Question.init(
    {
        text:{
            type:DataTypes.TEXT,
            allowNull:false,
        },
     


    },
    {
      sequelize,
      modelName: "question",
    }
  );


  module.exports = Question