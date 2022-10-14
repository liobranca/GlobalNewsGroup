import React, { useEffect, useState } from "react"
import {
  Text,
  View,
  TextInput,
  Button,
  createElement,
  Switch,
} from "react-native"
import { useForm, Controller } from "react-hook-form"
import axios from "axios"
import SelectList from "react-native-dropdown-select-list"
import { styles } from "../style/SendSurvey.Style"
import { useSelector } from "react-redux"
import { closeAlert, showAlert } from "react-native-customisable-alert"

function DateTimePicker({ value, onChange, style }) {
  return createElement("input", {
    type: "datetime-local",
    value: value,
    onChange,
    style,
  })
}

const SendSurvey = () => {
  const [selectedSurvey, setSelectedSurvey] = useState(null)
  const [selectedList, setSelectedList] = useState(null)
  const [surveys, setSurveys] = useState([])
  const [lists, setLists] = useState([])
  const [date, setDate] = useState("")
  const [isEnabled, setIsEnabled] = useState(true)

  const parameters = useSelector((state) => state.parameters)

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/survey/`)
      .then((res) => {
        let arraySurveys = res.data.map((survey) => {
          return { key: survey.id, value: survey.name }
        })
        setSurveys(arraySurveys)
      })
      .catch((e) => {
        console.error(e)
      })
    axios
      .get(`http://localhost:8080/api/lists/`)
      .then((res) => {
        let arrayLists = res.data.map((list) => {
          return { key: list.id, value: list.description }
        })
        setLists(arrayLists)
      })
      .catch((e) => {
        console.error(e)
      })
  }, [])

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      subject: "",
      body: "",
    },
  })

  const onSubmitForm = ({ body, subject }) => {
    if (!selectedList || !selectedSurvey) {
      showAlert({
        title: "¡Error!",
        message: "Verifique nuevamente los campos antes de enviar la encuesta",
        alertType: "warning",
        onPress: () => {
          closeAlert()
        },
      })
    } else {
      axios
        .post(`http://localhost:8080/api/survey/sendSurvey`, {
          idSurvey: selectedSurvey,
          idList: selectedList,
          parameters: {
            stack: parameters.stack,
            intervalo: parameters.intervalo,
            body,
            subject,
            date,
          },
        })
        .then((response) => {
          response.data.status === 202
            ? showAlert({
                title: "Envio realizado",
                message: "La encuesta fue enviada satisfactoriamente.",
                alertType: "success",
                onPress: () => {
                  closeAlert()
                },
              })
            : showAlert({
                title: "¡Error!",
                message: "Algo ha ocurrido y no se ha enviado la encuesta",
                alertType: "error",
                onPress: () => {
                  closeAlert()
                },
              })
        })
        .catch((error) => console.log(error))
    }
  }

  const handleSubmitDate = (e) => {
    setDate(e.target.value)
  }

  const toggleSwitchDate = () => {
    setIsEnabled((previousState) => !previousState)
    setDate("")
  }

  return (
    <View style={styles.container}>
      <View style={styles.label}>
        <SelectList
          setSelected={setSelectedSurvey}
          data={surveys}
          placeholder="Seleccione una encuesta"
          searchPlaceholder="Buscar encuesta"
        />
      </View>

      <View style={styles.label}>
        <SelectList
          setSelected={setSelectedList}
          data={lists}
          placeholder="Seleccione una lista"
          searchPlaceholder="Buscar lista"
        />
      </View>

      <Text style={styles.label}>Asunto de e-mail</Text>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            value={value}
          />
        )}
        name="subject"
        rules={{ required: true }}
      />
      {errors.subject && (
        <Text style={styles.labelError}>Campo requerido.</Text>
      )}

      <Text style={styles.label}>Cuerpo de e-mail (Plantilla HTML)</Text>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input_body}
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            value={value}
            multiline={true}
          />
        )}
        name="body"
        rules={{ required: true }}
      />
      {errors.body && <Text style={styles.labelError}>Campo requerido.</Text>}

      <View
        style={{
          marginTop: 10,
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "row",
          }}
        >
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitchDate}
            value={isEnabled}
          />
          <Text
            style={{
              marginStart: 5,
            }}
          >
            Enviar ahora
          </Text>
        </View>

        <View>
          {!isEnabled && (
            <>
              <Text style={styles.label}>Fecha de envio programada:</Text>
              <DateTimePicker onChange={handleSubmitDate} value={date} />
            </>
          )}
        </View>
      </View>

      <View style={styles.button}>
        <Button
          style={styles.buttonInner}
          color
          title="Enviar encuesta"
          onPress={handleSubmit(onSubmitForm)}
        />
      </View>
    </View>
  )
}

export default SendSurvey
