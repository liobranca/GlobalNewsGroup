import { StatusBar } from "expo-status-bar"
import React, { useState } from "react"
import { Text, View, Image, TextInput, TouchableOpacity } from "react-native"
import { useNavigation } from "@react-navigation/native"
import Styles from "../style/Style"
import FormStyles from "../style/Forms.Style"
import axios from "axios"

const FormOffice = () => {
  const [country, setCountry] = useState("")
  const [name, setName] = useState("")
  const [paused, setPaused] = useState(false)
  const navigation = useNavigation()
  const handleSubmit = () => {
    axios.post(`http://localhost:8080/api/offices/`, { country, name, paused })
    navigation.navigate("OfficeOption")
  }

  return (
    <View style={Styles.container}>
      <View>
        <TextInput
          style={FormStyles.text}
          placeholder="País"
          placeholderTextColor="#A9B4B4"
          onChangeText={(country) => setCountry(country)}
        />

        <TextInput
          style={FormStyles.text}
          placeholder="Nombre de la oficina"
          placeholderTextColor="#A9B4B4"
          onChangeText={(name) => setName(name)}
        />
      </View>
      <TouchableOpacity onPress={handleSubmit} style={FormStyles.button}>
        <Text style={FormStyles.buttonText}>Crear Oficina</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  )
}

export default FormOffice
