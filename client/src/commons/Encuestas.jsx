import { PlusOutlined } from "@ant-design/icons"
import { useNavigation } from "@react-navigation/native"
import axios from "axios"
import React from "react"
import { useState } from "react"
import { Text, TouchableOpacity, View, TextInput } from "react-native"
import { closeAlert, showAlert } from "react-native-customisable-alert"
import { CheckBox, Switch } from "react-native-elements"
import Styles from "../style/Style"

export default function Encuestas() {
  const navigation = useNavigation()
  let response = []
  let responseFinal = []
  const [count, setCount] = useState(0)
  const [question, setQuestion] = useState("")
  const [questionAndAnswer, setQuestionAndAnswer] = useState("")
  const [response1, setResponse1] = useState("")
  const [response2, setResponse2] = useState("")
  const [response3, setResponse3] = useState("")
  const [response4, setResponse4] = useState("")
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [type, setType] = useState("desarollo_libre")
  const [sw, setSw] = useState(false)
  const [isAnonymous, setIsAnonymous] = useState(true)
  const save = () => {
    if (question && name) {
      setCount(count + 1)
      if (response1) response.push(response1)
      if (response2) response.push(response2)
      if (response3) response.push(response3)
      if (response4) response.push(response4)
      setQuestionAndAnswer((questionAndAnswer) => [
        ...questionAndAnswer,
        { type: type, Pregunta: question, respuesta: response },
      ])
      setResponse1("")
      setResponse2("")
      setResponse3("")
      setResponse4("")
      setQuestion("")
    } else {
      showAlert({
        title: "Encuesta",
        message: "Algunos campos estan incompletos, su pregunta no se creara",
        alertType: "error",
        onPress: () => {
          closeAlert()
        },
      })
    }
  }
  const handleSubmit = () => {
    if (name && description && questionAndAnswer) {
      surveyCreate({ name, description, questionAndAnswer, isAnonymous })
      navigation.navigate("Encuestas")
      showAlert({
        title: "Encuesta",
        message: "La encuesta se realizo con exito",
        alertType: "success",
        onPress: () => {
          closeAlert()
        },
      })
    } else {
      showAlert({
        title: "Encuesta",
        message:
          "Algunos campos estan incompletos o no agrego su pregunta,su encuesta no se creara",
        alertType: "error",
        onPress: () => {
          closeAlert()
        },
      })
    }
  }

  const surveyCreate = (data) => {
    axios
      .post(`http://localhost:8080/api/survey/createSurvey`, data)
      .then((r) => r.data)
      .catch((err) => console.error("encuesta invalida", err))
  }
  const toggleSwitch = () => {
    if (type == "multiple_opcion") {
      setType("respuesta_unica")
      setSw(true)
    } else {
      setType("multiple_opcion")
      setSw(false)
    }
  }
  const toggleSwitchAnonimus = () => {
    if (isAnonymous) {
      setIsAnonymous(false)
    } else {
      setIsAnonymous(true)
    }
  }

  return (
    <View style={Styles.containerSurvey}>
      <Text style={{ fontWeight: "bold" }}>
        {"Cantidad de preguntas: " + count}
      </Text>
      <TextInput
        defaultValue={name}
        onChangeText={(name) => setName(name)}
        placeholder="Titulo"
        style={Styles.TextInput}
      ></TextInput>
      <TextInput
        value={description}
        onChangeText={(description) => setDescription(description)}
        placeholder="Descripción"
        style={Styles.TextInput}
      ></TextInput>
      <View>
        {!isAnonymous ? <Text>No es anonima</Text> : <Text>Anonima</Text>}
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={sw ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitchAnonimus}
          value={!isAnonymous}
        />
      </View>
      <Text style={{ fontWeight: "bold", margin: 5 }}>Estilo de pregunta</Text>
      <View>
        <Text>
          <TouchableOpacity
            style={type == "desarollo_libre" ? Styles.false : Styles.true}
            onPress={() => setType("multiple_opcion")}
          >
            <Text>Multiple</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={type == "desarollo_libre" ? Styles.true : Styles.false}
            onPress={() => setType("desarollo_libre")}
          >
            <Text>Desarrollo</Text>
          </TouchableOpacity>
        </Text>

        {type == "desarollo_libre" ? (
          <TextInput
            value={question}
            onChangeText={(question) => setQuestion(question)}
            placeholder="Pregunta"
            style={Styles.TextInput}
          ></TextInput>
        ) : (
          <View>
            <View style={Styles.forgot_button}>
              {sw ? (
                <Text>Seleccion unica</Text>
              ) : (
                <Text>No es seleccion unica</Text>
              )}
              <Switch
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={sw ? "#f5dd4b" : "#f4f3f4"}
                backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={sw}
              />
            </View>
            <TextInput
              value={question}
              onChangeText={(question) => setQuestion(question)}
              placeholder="Pregunta"
              style={Styles.TextInputQuestion}
            ></TextInput>
            <CheckBox
              style={Styles.button_question}
              title={
                <TextInput
                  value={response1}
                  onChangeText={(respons) => setResponse1(respons)}
                  placeholder="Respuesta 1"
                  style={Styles.TextInput2}
                ></TextInput>
              }
            />
            <CheckBox
              style={Styles.button_question}
              title={
                <TextInput
                  value={response2}
                  onChangeText={(respons) => setResponse2(respons)}
                  placeholder="Respuesta 2"
                  style={Styles.TextInput2}
                ></TextInput>
              }
            />
            <CheckBox
              style={Styles.button_question}
              title={
                <TextInput
                  value={response3}
                  onChangeText={(respons) => setResponse3(respons)}
                  placeholder="Respuesta 3"
                  style={Styles.TextInput2}
                ></TextInput>
              }
            />
            <CheckBox
              style={Styles.button_question}
              title={
                <TextInput
                  value={response4}
                  onChangeText={(respons) => setResponse4(respons)}
                  placeholder="Respuesta 4"
                  style={Styles.TextInput2}
                ></TextInput>
              }
            />
          </View>
        )}
        <Text></Text>
      </View>
      <Text style={Styles.title}>
        {" "}
        {"Agregar pregunta    "}
        <TouchableOpacity onPress={() => save()}>
          <PlusOutlined />
        </TouchableOpacity>
      </Text>
      <TouchableOpacity onPress={handleSubmit} style={Styles.loginBtn}>
        <Text style={Styles.title}>Crear encuesta</Text>
      </TouchableOpacity>
    </View>
  )
}
