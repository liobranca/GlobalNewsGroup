import { Loading3QuartersOutlined } from "@ant-design/icons"
import axios from "axios"
import React from "react"
import { useState } from "react"
import { useEffect } from "react"
import { Text } from "react-native"
import { View } from "react-native"
import Styles from "../style/Style"

const SingleSurvey = ({ route }) => {
  const { id } = route.params
  const [survey, setSurvey] = useState("")
  const [surveyCompleteds, setSurveyCompleteds] = useState("")
  const [qA, setQA] = useState([])

  useEffect(() => {
    axios.get(`http://localhost:8080/api/survey/single?id=${id}`).then((r) => {
      setSurvey(r.data)
      setQA(r.data.questionAndAnswer)
      setSurveyCompleteds(r.data.surveyCompleteds.length)
    })
  }, [])

  const sW = (type, qs, as) => {
    switch (type) {
      case "desarollo_libre":
        return (
          <View>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                marginLeft: "10px",
                marginTop: "10px",
              }}
            >
              Tipo: Desarrollo libre
            </Text>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                marginLeft: "10px",
                marginTop: "10px",
              }}
            >
              Pregunta: {as}
            </Text>
            <Text
              style={{
                fontSize: 20,
                marginHorizontal: "10px",
                marginTop: "10px",
              }}
            >
              <Loading3QuartersOutlined style={{ fontSize: 10 }} /> El
              encuestado debe desarrollar su respuesta
            </Text>
          </View>
        )
        break
      case "multiple_opcion":
        return (
          <>
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  marginLeft: "10px",
                  marginTop: "10px",
                }}
              >
                Tipo: Multiple opción
              </Text>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  marginLeft: "10px",
                  marginTop: "10px",
                }}
              >
                Pregunta: {as}
              </Text>
              <Text
                style={{
                  fontSize: 20,
                  textDecorationLine: "underline",
                  marginLeft: "10px",
                  marginTop: "10px",
                }}
              >
                Opciones:
              </Text>
            </View>
            <View style={{ flex: 1, flexDirection: "row", flexWrap: "wrap" }}>
              {qs.map((q, i) => (
                <Text
                  key={i}
                  style={{
                    fontSize: 20,
                    marginTop: "10px",
                    marginHorizontal: "10px",
                  }}
                >
                  <Loading3QuartersOutlined style={{ fontSize: 10 }} /> {q}
                </Text>
              ))}
            </View>
          </>
        )
        break
      case "respuesta_unica":
        return (
          <>
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  marginLeft: "10px",
                  marginTop: "10px",
                }}
              >
                Tipo: Unica respuesta
              </Text>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  marginLeft: "10px",
                  marginTop: "10px",
                }}
              >
                Pregunta: {as}
              </Text>
              <Text
                style={{
                  fontSize: 20,
                  textDecorationLine: "underline",
                  marginLeft: "10px",
                  marginTop: "10px",
                }}
              >
                Opciones:
              </Text>
            </View>
            <View style={{ flex: 1, flexDirection: "row", flexWrap: "wrap" }}>
              {qs.map((q, i) => (
                <Text
                  key={i}
                  style={{
                    fontSize: 20,
                    marginTop: "10px",
                    marginHorizontal: "10px",
                  }}
                >
                  <Loading3QuartersOutlined style={{ fontSize: 10 }} /> {q}
                </Text>
              ))}
            </View>
          </>
        )
        break

      default:
        break
    }
  }

  console.log(survey)
  return (
    <View
      style={{
        backgroundColor: "#e2e2e2",
        width: "auto",
        alignItems: "center",
      }}
    >
      <Text
        style={{
          fontSize: 25,
          fontWeight: "bold",
          textDecorationLine: "underline",
          marginLeft: "10px",
          marginTop: "10px",
        }}
      >
        Nombre
      </Text>
      <Text
        style={{
          fontSize: 20,
          marginLeft: "10px",
          marginTop: "10px",
        }}
      >
        {survey.name}
      </Text>
      <Text
        style={{
          fontSize: 25,
          fontWeight: "bold",
          textDecorationLine: "underline",
          marginLeft: "10px",
          marginTop: "10px",
        }}
      >
        Descripción:
      </Text>
      <Text
        style={{
          fontSize: 20,
          marginLeft: "10px",
          marginTop: "10px",
          marginBottom: "10px",
        }}
      >
        {survey.description}
      </Text>

      <View>
        {qA[0] ? (
          qA.map((q, i) => (
            <View key={i}>
              <Text
                style={{
                  fontSize: 25,
                  fontWeight: "bold",
                  textDecorationLine: "underline",
                  marginLeft: "10px",
                  marginTop: "10px",
                }}
              >
                Pregunta N°: {i + 1}
              </Text>
              <Text>{sW(q.type, q.respuesta, q.Pregunta)}</Text>
            </View>
          ))
        ) : (
          <Text>No hay preguntas.</Text>
        )}
        <View
          style={{
            flex: 1,
            alignItems: "center",
            marginTop: "10px",
            paddingVertical: "10px",
            backgroundColor: "#A9B4B4",
          }}
        >
          <Text
            style={{
              fontSize: 15,
              fontWeight: "bold",
              textDecorationLine: "underline",
            }}
          >
            Cantidad de respuestas a esta encuesta: {surveyCompleteds}
          </Text>
        </View>
      </View>
    </View>
  )
}

export default SingleSurvey
