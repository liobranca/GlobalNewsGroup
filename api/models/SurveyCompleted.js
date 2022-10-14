const {Model, DataTypes} = require("sequelize");
const sequelize = require("../config/db");


class SurveyCompleted extends Model {
  
}

SurveyCompleted.init(
    {
        answers:{
        type:DataTypes.JSON,
        allowNull:false
        },
        // respondDate:{
        //     type:DataTypes.DATEONLY,
        //     allowNull:false,
        // },
        respondent:{
            type:DataTypes.JSON,
            allowNull:false,
            defaultValue: {name:"anonimo"}
        },  
    },
    {
      sequelize,
      modelName: "surveyCompleted",
    }
  );


  module.exports = SurveyCompleted