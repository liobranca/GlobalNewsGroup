import axios from "axios"
import React from "react"
import { useState } from "react"
import { useEffect } from "react"
import { Text, View } from "react-native"
import Styles from "../style/Style"

const StatisticSurvey = ({ route }) => {
  const { id } = route.params
  const [survey, setSurvey] = useState({})
  const [surveyCompleteds, setSurveyCompleteds] = useState({})
  const [response, setResponse] = useState("")

  useEffect(() => {
    axios.get(`http://localhost:8080/api/survey/single?id=${id}`).then((r) => {
      setSurvey(r.data)
      setSurveyCompleteds(r.data.surveyCompleteds)
    })
  }, [])

  //   console.log(survey);

  let arrayPrueba = []

  function sW(respuesta, pregunta, type) {
    if (type === "desarollo_libre") {
      if (pregunta) {
        return <Text style={Styles.statiticsValue}>{`/ ${respuesta}`}</Text>
      }
    }
    if (type === "multiple_opcion") {
      if (pregunta) {
        return <Text style={Styles.statiticsValue}>{`/ ${respuesta}`}</Text>
      }
    }
    if (type === "respuesta_unica") {
      if (pregunta) {
        return <Text style={Styles.statiticsValue}>{`/ ${respuesta}`}</Text>
      }
    }
  }

  return (
    <View style={Styles.containerViews}>
      {survey.name ? (
        <>
          <View style={{ marginLeft: "7px" }}>
            <Text style={Styles.statiticsKey}>
              Nombre:
              <Text style={Styles.statiticsValue}>{survey.name}</Text>
            </Text>

            <Text style={Styles.statiticsKey}>
              Creada: Fecha:{" "}
              <Text style={Styles.statiticsValue}>
                {survey.createdAt.slice(0, 10)}
              </Text>{" "}
              Hora:{" "}
              <Text style={Styles.statiticsValue}>
                {survey.createdAt.slice(11, 16)}
              </Text>
            </Text>
            <Text style={Styles.statiticsKey}>
              Descripción:
              <Text style={Styles.statiticsValue}>{survey.description}</Text>
            </Text>
            <Text style={Styles.statiticsKey}>
              Veces respondida:
              <Text style={Styles.statiticsValue}>
                {surveyCompleteds.length}
              </Text>
            </Text>
            <Text style={Styles.statiticsKey}>
              ¿Es anonima?:
              <Text style={Styles.statiticsValue}>
                {survey.isAnonymous ? "Sí" : "No"}
              </Text>
            </Text>
            <Text style={Styles.statiticsKey}>
              Cantidad de preguntas:
              <Text style={Styles.statiticsValue}>
                {survey.questionAndAnswer.length}
              </Text>
            </Text>
            <Text style={Styles.statiticsKey}>
              Tiempo de respuesta:
              <Text style={Styles.statiticsValue}>
                {survey.questionAndAnswer.length * 1.5} min.
              </Text>
            </Text>
          </View>

          <View
            style={{
              borderTopWidth: 1,
              borderTopColor: "black",
              paddingTop: "7px",
              marginLeft: "7px",
            }}
          >
            {survey.questionAndAnswer[0] ? (
              survey.questionAndAnswer.map((question, index) => (
                <>
                  <Text key={index} style={Styles.statiticsKey}>
                    Pregunta N°{index + 1}:
                    <Text style={Styles.statiticsValue}>
                      {question.Pregunta}
                    </Text>
                  </Text>
                  <Text style={Styles.statiticsKey}>
                    Respuestas:
                    {surveyCompleteds[0] ? (
                      surveyCompleteds.map((surveyCompleted) =>
                        sW(
                          surveyCompleted.answers[question.Pregunta],
                          question.Pregunta,
                          question.type
                        )
                      )
                    ) : (
                      <Text>No hay respuestas</Text>
                    )}
                  </Text>
                </>
              ))
            ) : (
              <Text>No hay preguntas</Text>
            )}
          </View>
        </>
      ) : (
        <Text>Cargando...</Text>
      )}
    </View>
  )
}

export default StatisticSurvey
