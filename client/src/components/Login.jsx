import { StatusBar } from "expo-status-bar"
import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Text, View, Image, TextInput, TouchableOpacity } from "react-native"
import GoogleLog from "../../googleLogin/GoogleLogin"
import { sendLoginRequest } from "../../store/user"
import { useNavigation } from "@react-navigation/native"
import Ionicons from "@expo/vector-icons/Ionicons"

import Styles from "../style/Style"
import GlobalStyle from "../style/Style";
import FormStyles from "../style/Forms.Style";

const Login = () => {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigation = useNavigation()

  const handleLists = () => {
    navigation.navigate("Listas")
  }

  const handleSubmit = () => {
    dispatch(sendLoginRequest({ email, password }))
    navigation.navigate("UserView")
  }

  return user.email ? (
    user.admin ? (
      navigation.navigate("AdmindView")
    ) : (
      navigation.navigate("UserView")
    )
  ) : (
    <View style={{ ...GlobalStyle.container, flex: 1, alignItems: "center", justifyContent: "center", }}>
      <Image style={Styles.image} source={require("../assets/logo.png")} />

      <Text style={Styles.title}>Iniciar sesión</Text>

      <View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Ionicons name="at-sharp" size={20} color="#7a869a" />
          <TextInput
            style={FormStyles.text}
            placeholder="Email"
            placeholderTextColor="#A9B4B4"
            onChangeText={(email) => setEmail(email)}
          />
        </View>

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Ionicons name="lock-open-outline" size={20} color="#7a869a" />
          <TextInput
            style={FormStyles.text}
            placeholder="Contraseña"
            placeholderTextColor="#A9B4B4"
            secureTextEntry={true}
            onChangeText={(password) => setPassword(password)}
          />
        </View>
      </View>

      <TouchableOpacity>
        <Text style={Styles.forgot_button}>¿Olvidaste tu contraseña?</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleSubmit} style={Styles.loginBtn}>
        <Text style={{ color: "white", fontWeight: "bold", fontSize: 15 }}>
          Iniciar sesión
        </Text>
      </TouchableOpacity>

      <View style={Styles.lineStyle} />

      <GoogleLog />
      {/* <TouchableOpacity onPress={handleLists} style={Styles.loginBtn}>
              <Text>Ver listas de distribución</Text>
            </TouchableOpacity> */}

      <StatusBar style="auto" />
    </View>
  )
}

export default Login
