import {
  DeleteOutlined,
  EditOutlined,
  Loading3QuartersOutlined,
  PlusOutlined,
} from "@ant-design/icons"
import { useNavigation } from "@react-navigation/native"
import axios from "axios"
import React, { useEffect, useState } from "react"
import {
  FlatList,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native"
import { closeAlert, showAlert } from "react-native-customisable-alert"
import { CheckBox } from "react-native-elements"
import { useDispatch, useSelector } from "react-redux"
import { switchRender } from "../../store/render"
import Styles from "../style/Style"

const EditSurvey = () => {
  const [surveys, setSurveys] = useState([])
  const render = useSelector((state) => state.render)
  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/survey/`)
      .then((r) => setSurveys(r.data))
      .catch((err) => console.error("User invalid", err))
  }, [render])

  const renderItem = ({ item }) => (
    <View>
      <Item
        name={item.name}
        description={item.description}
        scheduledSend={item.scheduledSend}
        questionAndAnswer={item.questionAndAnswer}
        id={item.id}
        render={render}
      />
    </View>
  )

  return (
    <SafeAreaView style={Styles.containerDelete}>
      <View style={{ alignItems: "center" }}>
        <Text style={Styles.title}>Modificación de encuestas</Text>
      </View>
      <FlatList
        data={surveys}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  )
}

export default EditSurvey

const Item = function ({
  name,
  description,
  scheduledSend,
  questionAndAnswer,
  id,
  render,
}) {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const [survey, setSurvey] = useState({})
  const [edit, setEdit] = useState(false)

  const [count, setCount] = useState(questionAndAnswer.length)
  const [question, setQuestion] = useState(questionAndAnswer[0].Pregunta)
  const [newQuestionAndAnswer, setNewQuestionAndAnswer] =
    useState(questionAndAnswer)
  let response = newQuestionAndAnswer
  let responses = []
  let questions = []
  let newQuestions = []
  const [newResponse, setNewResponse] = useState(questionAndAnswer[1])

  const [newName, setNewName] = useState(name)
  const [newDescription, setNewDescription] = useState(description)
  const [newScheduledSend, setNewScheduledSend] = useState(scheduledSend)
  const [type, setType] = useState("desarollo_libre")

  const save = (index, type) => {
    if (type === "desarollo_libre") {
      if (questions[index]) {
        newQuestions[index] = response[index]
        showAlert({
          title: "Encuesta",
          message: "La pregunta se modifico con exito",
          alertType: "success",
          onPress: () => {
            closeAlert()
          },
        })
      } else {
        showAlert({
          title: "Encuesta",
          message:
            "Algunos campos estan incompletos, su pregunta no se modificara",
          alertType: "error",
          onPress: () => {
            closeAlert()
          },
        })
      }
    } else {
      if (responses[index] && questions[index]) {
        newQuestions[index] = response[index]
        showAlert({
          title: "Encuesta",
          message: "La pregunta se modifico con exito",
          alertType: "success",
          onPress: () => {
            closeAlert()
          },
        })
      } else {
        showAlert({
          title: "Encuesta",
          message:
            "Algunos campos estan incompletos, su pregunta no se modificara",
          alertType: "error",
          onPress: () => {
            closeAlert()
          },
        })
      }
    }
  }

  const handleEdit = () => {
    edit ? setEdit(false) : setEdit(true)
  }

  const handleDelete = () => {
    axios
      .delete(`http://localhost:8080/api/survey/removeSurvey?id=${id}`)
      .then((r) => dispatch(switchRender(!render)))
      .catch((err) => console.error("User invalid", err))
  }
  const ButtonAlert = () => {
    return showAlert({
      title: "Eliminar",
      message: "¿Desea eliminar la encuesta?",
      alertType: "warning",
      btnLabel: "Confirmar",
      leftBtnLabel: "Cancelar",
      onPress: () => {
        handleDelete(), closeAlert()
      },
    })
  }

  const handleSubmit = () => {
    if (newName && newDescription && newQuestions.length >= 1) {
      surveyEdit({
        name: newName,
        description: newDescription,
        questionAndAnswer: newQuestions,
      })
      navigation.navigate("Encuestas")
      showAlert({
        title: "Encuesta",
        message: "La encuesta se modifico con exito",
        alertType: "success",
        onPress: () => {
          closeAlert()
        },
      })
    } else {
      showAlert({
        title: "Encuesta",
        message:
          "Algunos campos estan incompletos o no agrego su pregunta,su encuesta no se modificara",
        alertType: "error",
        onPress: () => {
          closeAlert()
        },
      })
    }
  }

  const setQuestions = (value, index) => {
    typeof questions[index] === "object"
      ? (questions[index] = value)
      : (questions[index] = [])
    questions[index] = value
  }

  const setResponses = (value, index, i) => {
    typeof responses[index] === "object"
      ? (responses[index][i] = value)
      : (responses[index] = [])
    responses[index][i] = value
  }

  const handleEditQuestions = (e, type, question, index) => {
    if (type === "desarollo_libre") {
      response[index] = {
        type: type,
        Pregunta: questions[index],
        respuesta: "",
      }
    } else {
      response[index] = {
        type: type,
        Pregunta: questions[index],
        respuesta: responses[index],
      }
    }
  }

  const surveyEdit = (data) => {
    axios
      .put(`http://localhost:8080/api/survey/modifySurvey?id=${id}`, data)
      .then((r) => r.data)
      .catch((err) => console.error("encuesta invalida", err))
  }

  const sW = (type, qs, as, index) => {
    switch (type) {
      case "desarollo_libre":
        return (
          <>
            <Text style={{ marginHorizontal: "auto", marginBottom: 10 }}>
              Respuesta a desarrollar
            </Text>
            <TextInput
              // defaultValue="..."
              onChangeText={(newValue) => {
                setQuestions(newValue, index)
                handleEditQuestions(
                  newValue,
                  newQuestionAndAnswer[index].type,
                  newQuestionAndAnswer[index].Pregunta,
                  index
                )
              }}
              placeholder="Pregunta"
              style={Styles.TextInput}
            ></TextInput>
            <Text
              style={{
                marginHorizontal: "auto",
                fontSize: 20,
                marginBottom: 10,
              }}
            >
              {"Editar pregunta    "}
              <TouchableOpacity
                onPress={() => save(index, newQuestionAndAnswer[index].type)}
              >
                <EditOutlined style={Styles.icons} />
              </TouchableOpacity>
            </Text>
          </>
        )
        break
      case "multiple_opcion":
        return (
          <View key={index}>
            <Text style={{ marginHorizontal: "auto", marginBottom: 10 }}>
              Multiple opción
            </Text>
            <TextInput
              // defaultValue="..."
              onChangeText={(newValue) => {
                setQuestions(newValue, index)
                handleEditQuestions(
                  newValue,
                  newQuestionAndAnswer[index].type,
                  newQuestionAndAnswer[index].Pregunta,
                  index
                )
              }}
              placeholder="Pregunta"
              style={Styles.TextInput}
            ></TextInput>
            {qs[0] ? (
              qs.map((q, i) => (
                <>
                  <CheckBox
                    key={i}
                    style={Styles.button_question}
                    title={
                      <TextInput
                        // defaultValue="..."
                        onChangeText={(newValue) => {
                          setResponses(newValue, index, i)
                          handleEditQuestions(
                            newValue,
                            newQuestionAndAnswer[index].type,
                            newQuestionAndAnswer[index].Pregunta,
                            index
                          )
                        }}
                        placeholder={`Respuesta ${i + 1}`}
                        style={Styles.TextInput2}
                      ></TextInput>
                    }
                  />
                </>
              ))
            ) : (
              <Text></Text>
            )}
            <Text
              style={{
                marginHorizontal: "auto",
                fontSize: 20,
                marginBottom: 10,
              }}
            >
              {"Editar pregunta    "}
              <TouchableOpacity onPress={() => save(index)}>
                <EditOutlined style={Styles.icons} />
              </TouchableOpacity>
            </Text>
          </View>
        )
        break
      case "respuesta_unica":
        return (
          <View key={index}>
            <Text style={{ marginHorizontal: "auto", marginBottom: 10 }}>
              Única opción
            </Text>
            <TextInput
              // defaultValue="..."
              onChangeText={(newValue) => {
                setQuestions(newValue, index)
                handleEditQuestions(
                  newValue,
                  newQuestionAndAnswer[index].type,
                  newQuestionAndAnswer[index].Pregunta,
                  index
                )
              }}
              placeholder="Pregunta"
              style={Styles.TextInput}
            ></TextInput>
            {qs[0] ? (
              qs.map((q, i) => (
                <>
                  <CheckBox
                    key={i}
                    style={Styles.button_question}
                    title={
                      <TextInput
                        // defaultValue="..."
                        onChangeText={(newValue) => {
                          setResponses(newValue, index, i)
                          handleEditQuestions(
                            newValue,
                            newQuestionAndAnswer[index].type,
                            newQuestionAndAnswer[index].Pregunta,
                            index
                          )
                        }}
                        placeholder={`Respuesta ${i + 1}`}
                        style={Styles.TextInput2}
                      ></TextInput>
                    }
                  />
                </>
              ))
            ) : (
              <Text></Text>
            )}
            <Text
              style={{
                marginHorizontal: "auto",
                fontSize: 20,
                marginBottom: 10,
              }}
            >
              {"Editar pregunta    "}
              <TouchableOpacity onPress={() => save(index)}>
                <EditOutlined style={Styles.icons} />
              </TouchableOpacity>
            </Text>
          </View>
        )
        break

      default:
        break
    }
  }

  return (
    <View style={Styles.item}>
      <View
        style={{ flexDirection: "column", flexWrap: "wrap", width: "100%" }}
      >
        <Text style={Styles.title}>{name}</Text>
        <TouchableOpacity
          onPress={handleEdit}
          style={{ position: "absolute", right: "35px", zIndex: 1000 }}
        >
          <EditOutlined style={Styles.icons} />
        </TouchableOpacity>
        <Text style={Styles.subtitle}>{description}</Text>
        {edit ? (
          <View style={Styles.container}>
            <Text style={{ fontWeight: "bold", marginTop: 10 }}>
              {"Cantidad de preguntas: " + count}
            </Text>
            <Text style={{ marginTop: 10 }}>Nombre</Text>
            <TextInput
              onChangeText={(newName) => setNewName(newName)}
              placeholder="Nombre"
              style={Styles.TextInput}
            ></TextInput>
            <Text>Descripción</Text>
            <TextInput
              onChangeText={(newDescription) =>
                setNewDescription(newDescription)
              }
              placeholder="Descripción"
              style={Styles.TextInput}
            ></TextInput>
            <Text style={{ fontWeight: "bold" }}>Preguntas</Text>
            {newQuestionAndAnswer[0] ? (
              newQuestionAndAnswer.map((qA, i) => (
                <View key={i}>
                  <Text
                    style={{ marginHorizontal: "auto", marginVertical: 10 }}
                  >
                    Pregunta N°: {i + 1} - {qA.Pregunta}
                  </Text>
                  {sW(qA.type, qA.respuesta, qA.Pregunta, i)}
                </View>
              ))
            ) : (
              <Text></Text>
            )}

            <TouchableOpacity onPress={handleSubmit} style={Styles.loginBtn}>
              <Text style={Styles.title}>Editar Encuesta</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <Text></Text>
        )}
        <TouchableOpacity
          onPress={ButtonAlert}
          style={{ position: "absolute", right: "0" }}
        >
          <DeleteOutlined style={Styles.icons} />
        </TouchableOpacity>
      </View>
    </View>
  )
}
