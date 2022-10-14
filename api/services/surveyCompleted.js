const SurveyCompleted = require("../models/SurveyCompleted");
const Survey = require("../models/Survey");

class SurveyCompletedService {
  static async getAll(req, res, next) {
    try {
      //* Trae todas las encuestas creadas.
      const surveysCompleteds = await SurveyCompleted.findAll();
      res.status(200).send(surveysCompleteds);
    } catch (error) {}
  }

  static async getSingle(req,res){
    const {id} = req.query
    try {
      //* Trae las encuestas contestadas con su respectiva encuesta original
      const survey = await SurveyCompleted.findByPk(id,{include: {model: Survey}})
      res.status(200).send(survey)
    } catch (error) {
      
    }
  }

  //* Aca se manda la encuesta respondida a la base de datos y se asocia a la plantilla de la encuesta
  static async createSurveyComplete(req, res, next) {
    const { surveyId } = req.query;
    try {
      const surveyCompleted = await SurveyCompleted.create(req.body);
      const survey = await Survey.findByPk(surveyId);
      //* Magic Method para asociar la encuesta respondida con la encuesta original.
      survey.addSurveyCompleted(surveyCompleted);
      res.status(201).send({ message: "Encuesta contestada correctamente." });
    } catch (error) {
      console.error(error);
    }
  }

  static async deleteSurveyComplete(req, res, next) {
    const { surveyId } = req.query;
    const { surveyCompletedId } = req.query;

    try {
      const surveyCompleted = await SurveyCompleted.findByPk(surveyCompletedId);
      const survey = await Survey.findByPk(surveyId);
      //* Magic Method para remover la encuesta respondida de la encuesta original.
      survey.removeSurveyCompleted(surveyCompleted);

      //* Aca elimina la encuesta contestada de la base de datos.
      const deletedSurveyCompleted = await SurveyCompleted.destroy({
        where: { id: surveyCompletedId },
      });
      if (deletedSurveyCompleted === 0) next(error);
      res.status(202).send({
        message: "Encuesta eliminada",
      });
    } catch (error) {
      console.error({ message: "La encuesta no existe" });
      res.status(404).send({ message: "La encuesta no existe" });
    }
  }
}

module.exports = SurveyCompletedService;
