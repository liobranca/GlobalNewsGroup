import { StatusBar } from "expo-status-bar"
import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native"
import { sendRegisterUser } from "../../store/user"
import { useNavigation } from "@react-navigation/native"
import { CheckBox } from "react-native-elements"
import axios from "axios"

import GlobalStyle from "../style/Style"
import FormStyles from "../style/Forms.Style"

const FormUser = () => {
  const user = useSelector((state) => state.user)

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [admin, setAdmin] = useState(false)
  const navigation = useNavigation()
  const sendRegisterUser = (data) => {
    axios
      .post(`http://localhost:8080/api/user/register`, data)
      .then((r) => r.data)
      .catch((err) => console.error("User invalid", err))
  }
  const handleSubmit = () => {
    sendRegisterUser({ email, password, firstName, lastName, admin })
    navigation.navigate("UserOption")
  }

  return (
    <View style={GlobalStyle.container}>
      <View>
        <TextInput
          style={FormStyles.text}
          placeholder="Email"
          placeholderTextColor="#A9B4B4"
          onChangeText={(email) => setEmail(email)}
        />

        <TextInput
          style={FormStyles.text}
          placeholder="Contraseña"
          placeholderTextColor="#A9B4B4"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
        <TextInput
          style={FormStyles.text}
          placeholder="Nombre completo"
          placeholderTextColor="#A9B4B4"
          onChangeText={(firstName) => setFirstName(firstName)}
        />
        <TextInput
          style={FormStyles.text}
          placeholder="Apellido"
          placeholderTextColor="#A9B4B4"
          onChangeText={(lastName) => setLastName(lastName)}
        />
        <CheckBox
          title="¿Es Admin?"
          checked={admin}
          onPress={() => (admin ? setAdmin(false) : setAdmin(true))}
        />
      </View>
      <TouchableOpacity onPress={handleSubmit} style={FormStyles.button}>
        <Text style={FormStyles.buttonText}>Crear Usuario</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  )
}

export default FormUser
