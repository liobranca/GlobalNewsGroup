const { List, Client, Survey, SurveyCompleted } = require("../models")
const sendEmail = require("../config/email")
const sender = "noreply.globalnews.plataforma5@gmail.com"
const { dateToTimestamp } = require("../utils")

class SurveyService {
  static async getAll(req, res) {
    try {
      //* Trae todas las encuestas creadas.
      const surveys = await Survey.findAll()
      res.status(200).send(surveys)
    } catch (error) {
      console.error(error)
    }
  }

  static async getSingle(req, res) {
    const { id } = req.query
    try {
      //* Trae las encuestas creadas con su respectivas encuestas respondidas, si las tiene.
      const survey = await Survey.findByPk(id, {
        include: { model: SurveyCompleted },
      })
      res.status(200).send(survey)
    } catch (error) {
      console.error(error)
    }
  }

  static async createSurvey(req, res) {
    try {
      //en el campo de quiestionAndAnswer, deberá llegar un json con las preguntas como key y las respuestas (si es que tiene) como su value
      const surveyCreated = await Survey.create(req.body)
      res.status(201).send({
        message: "Encuesta creada",
        surveyCreated,
      })
    } catch (error) {
      console.error(error)
    }
  }

  static async editSurvey(req, res, next) {
    const { id } = req.query
    try {
      const [surveyOutdated, surveyUpdated] = await Survey.update(req.body, {
        where: { id },
        returning: true,
      })
      res.status(201).send({
        message: "Encuesta modificada",
        surveyUpdated,
      })
    } catch (error) {
      console.error(error)
    }
  }

  static async sendSurvey(req, res) {
    const { idSurvey, idList, parameters } = req.body
    const list = await List.findByPk(idList, {
      include: { model: Client },
    })
    const survey = await Survey.findByPk(idSurvey)

    let duration = survey?.questionAndAnswer?.length * 2

    const msg = {
      from: {
        email: sender,
        name: "Global News P5",
      },
      subject: parameters.subject,
      html: `${parameters.body}
      <br><strong>LINK DE LA ENCUESTA: http://localhost:3000/${idSurvey}</strong><br><strong>DURACION ESTIMADA DE LA ENCUESTA: ${duration} MINUTOS</strong>`,
    }

    let timestamp = parameters.date
      ? dateToTimestamp(parameters.date)
      : Math.floor(new Date().getTime() / 1000.0)

    // list.clients is an array of emails. Reduce the array to 5 emails for every entry in the array
    const emails = list.clients.reduce((acc, client, index) => {
      if (index % parameters.stack === 0) {
        acc.push([client.email])
      } else {
        acc[acc.length - 1].push(client.email)
      }
      return acc
    }, [])

    let personalizations = emails.map((tanda) => {
      // tanda es un array de emails ['asdf@asdf.com', 'sadaf2@asdf.com']
      let obj = {
        to: tanda.map((email) => {
          return { email }
        }),
        send_at: timestamp,
      }
      timestamp += parameters.intervalo * 60
      return obj
    })

    sendEmail({
      ...msg,
      personalizations,
    })
      .then((response) => {
        res.status(response[0].statusCode).send({
          status: response[0].statusCode,
          headers: response[0].headers,
        })
      })
      .catch((error) => {
        res.status(400).send({ message: error.message })
      })
  }

  static async deleteSurvey(req, res, next) {
    const { id } = req.query
    try {
      const deletedSurvey = await Survey.destroy({ where: { id } })
      if (deletedSurvey === 0) next(error)
      res.status(202).send({
        message: "Encuesta eliminada",
      })
    } catch (error) {
      console.error({ message: "La encuesta no existe" })
      res.status(404).send({ message: "La encuesta no existe" })
    }
  }
}

module.exports = SurveyService
